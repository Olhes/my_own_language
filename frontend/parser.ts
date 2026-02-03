import{
    BinaryExpr,
    Expr,
    Identifier,
    NumericLiteral,
    Program,
    Stmt,
    VarDeclaration,
    AssignmentExpr,
} from "./ast.ts";


import {Token,tokenize, TokenType} from "./lexer.ts";

export default class Parser{
    private tokens: Token[] =[];
    
    private not_eof(): boolean{
        return this.tokens[0].type != TokenType.EOF;
    }

    private at(){
        return this.tokens[0] as Token;
    }

    private eat(){
        const prev= this.tokens.shift() as Token;
        return prev;
    }

    private expect(type: TokenType, err: string){
        const prev= this.tokens.shift() as Token;

        if(!prev || prev.type !=type){
        console.error("Parser Error: \n", err,prev," - Expecting: ", type);
        Deno.exit(1);    
        }

        return prev;
    }

    public produceAST(sourceCode: string): Program{
        this.tokens= tokenize(sourceCode);
        const program: Program ={
            kind: "Program",
            body: [],
        };
    

        while (this.not_eof()){
            program.body.push( this.parse_stmt());
        }

        return program;
    }

    private parse_stmt(): Stmt{
     switch(this.at().type){
        case TokenType.Let:
        case TokenType.Const:
            return this.parse_var_declaration();
        default:
            // Check for assignment (identifier = expression)
            if (this.at().type == TokenType.Identifier && this.tokens.length > 1 && this.tokens[1].type == TokenType.Equals) {
                return this.parse_assignment();
            }
            return this.parse_expr()
     }
    }

    private parse_var_declaration(): Stmt{
        const isConstant= this.eat().type== TokenType.Const;
        const identifier = {
            kind: "Identifier",
            symbol: this.expect(TokenType.Identifier, "Expected identifier name following let | const keywords.").value
        } as Identifier;
        
        if(this.at().type==TokenType.Semicolon){
            this.eat(); // Consume the semicolon
            if(isConstant){
                throw "Must assign value to constant expression. No value provided.";
            }
            
            return {
                kind: "VarDeclaration",
                identifier,
                constant: false,
                value: undefined
            } as VarDeclaration;
        }
        
        // Expect '=' for assignment
        this.expect(TokenType.Equals, "Expected '=' token following variable declaration.");
        
        // Parse the assigned expression
        const declaration = this.parse_expr();
        
        // Expect semicolon at the end
        this.expect(TokenType.Semicolon, "Expected ';' at the end of variable declaration.");
        
        return {
            kind: "VarDeclaration",
            identifier,
            constant: isConstant,
            value: declaration
        } as VarDeclaration;
    }
    
    private parse_assignment(): Expr {
        const assigne = this.parse_primary_expr();
        this.expect(TokenType.Equals, "Expected '=' token following assignment expression.");
        const value = this.parse_expr();
        
        return {
            kind: "AssignmentExpr",
            assigne,
            value
        } as AssignmentExpr;
    }
    
    private parse_expr():Expr{
        return this.parse_additive_expr();
    }

    private parse_additive_expr(): Expr{
        let left=this.parse_multiplicitave_expr();

        while(this.at().value=="+" || this.at().value=="-"){
            const operator= this.eat().value;
            const right= this.parse_multiplicitave_expr();

            left={
                kind:"BinaryExpr",
                left,
                right,
                operator,

            } as BinaryExpr;
        }
        return left;
    }

    private parse_multiplicitave_expr(): Expr{
        let left=this.parse_primary_expr();

        while(
            this.at().value=="/" || this.at().value=="*" || this.at().value=="%"
        ){
            const operator= this.eat().value;
            const right= this.parse_primary_expr();
            left={
                kind: "BinaryExpr",
                left,
                right,
                operator,
             } as BinaryExpr;
    }
    return left;
}

    private parse_primary_expr():Expr{
        const tk=this.at().type;

        switch(tk){
            case TokenType.Identifier:
                return{kind: "Identifier", symbol: this.eat().value} as Identifier;

            case TokenType.Number:
                return{
                    kind: "NumericLiteral",
                    value: parseFloat(this.eat().value),
                }  as NumericLiteral;
            
            case TokenType.OpenParen: {
                this.eat();
                const value= this.parse_expr();
                this.expect(
                    TokenType.CloseParen,
                    "Unexpected token found inside parenthesised expression.Expected closing parenthesis. ",
                );
                return value;
            }

            default:
                console.error("Unexpected token found during parsing: ", this.at());
                Deno.exit(1);
        }
    }
}

