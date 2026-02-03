import { tokenize, TokenType } from './lexer.ts';

function runLexerTests() {
    const testCases = [
        {
            input: "let x = 42",
            expected: [
                { type: TokenType.Let, value: "let" },
                { type: TokenType.Identifier, value: "x" },
                { type: TokenType.Equals, value: "=" },
                { type: TokenType.Number, value: "42" },
                { type: TokenType.EOF, value: "EndOfFile" }
            ]
        },
        {
            input: "(5 + 3) * 2",
            expected: [
                { type: TokenType.OpenParen, value: "(" },
                { type: TokenType.Number, value: "5" },
                { type: TokenType.BinaryOperator, value: "+" },
                { type: TokenType.Number, value: "3" },
                { type: TokenType.CloseParen, value: ")" },
                { type: TokenType.BinaryOperator, value: "*" },
                { type: TokenType.Number, value: "2" },
                { type: TokenType.EOF, value: "EndOfFile" }
            ]
        }
    ];

    for (const { input, expected } of testCases) {
        console.log(`Testing input: "${input}"`);
        const result = tokenize(input);
        console.log("Result:", result);

        if (JSON.stringify(result) === JSON.stringify(expected)) {
            console.log("✅ Test passed!");
        } else {
            console.error("❌ Test failed!");
            console.error("Expected:", expected);
            console.error("Received:", result);
        }
    }
}

runLexerTests();
