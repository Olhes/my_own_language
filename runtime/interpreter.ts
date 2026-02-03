import { MK_NULL, NumberVal, RuntimeVal } from "./values.ts";
import { BinaryExpr, NumericLiteral, Program, Stmt, Identifier } from "../frontend/ast.ts";
import Environment from "./environments.ts"; // Asegúrate que la ruta sea correcta, si no, es 'environment.ts' sin la 's' al final


// MODIFICAR: eval_program debe recibir 'env' como parámetro
function eval_program(program: Program, env: Environment): RuntimeVal { // AÑADIR 'env: Environment'
    let lastEvaluated: RuntimeVal = MK_NULL();
    for (const statement of program.body) {
        lastEvaluated = evaluate(statement, env); // Pasar 'env' a evaluate
    }
    return lastEvaluated;
}


function eval_numeric_binary_expr(
    lhs: NumberVal,
    rhs: NumberVal,
    operator: string,
): NumberVal {
    let result: number;
    if (operator == "+") {
        result = lhs.value + rhs.value;
    } else if (operator == "-") {
        result = lhs.value - rhs.value;
    } else if (operator == "*") {
        result = lhs.value * rhs.value;
    } else if (operator == "/") {
        // TODO: Division by zero checks
        result = lhs.value / rhs.value;
    } else {
        result = lhs.value % rhs.value;
    }

    return { value: result, type: "number" };


}


function eval_binary_expr(binop: BinaryExpr, env: Environment): RuntimeVal { // AÑADIR 'env: Environment'
    const lhs = evaluate(binop.left, env); // Pasar 'env' a evaluate
    const rhs = evaluate(binop.right, env); // Pasar 'env' a evaluate

    
    if (lhs.type == "number" && rhs.type == "number") {
        return eval_numeric_binary_expr(
            lhs as NumberVal,
            rhs as NumberVal,
            binop.operator,
        );
    }

    // One or both are NULL
    return MK_NULL();
}

function eval_identifier(ident: Identifier, env: Environment): RuntimeVal {
  const val = env.lookupVar(ident.symbol);
  return val;
}

export function evaluate(astNode: Stmt, env: Environment): RuntimeVal { // AÑADIR 'env: Environment'
    switch (astNode.kind) {
        case "NumericLiteral":
            return {
                value: ((astNode as NumericLiteral).value),
                type: "number",
            } as NumberVal;
        
        case "BinaryExpr":
            // Pasar 'env' a eval_binary_expr
            return eval_binary_expr(astNode as BinaryExpr, env);
        case "Program":
            // Pasar 'env' a eval_program
            return eval_program(astNode as Program, env);

        // Ya tenías estos casos, solo asegúrate de que existan las funciones de arriba
        
        case "Identifier":
            return eval_identifier(astNode as Identifier, env);

        default:
            console.error(
                "This AST Node has not yet been setup for interpretation.",
                astNode,
            );
            Deno.exit(0);
    }
}