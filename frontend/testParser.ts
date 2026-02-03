// Importa el parser y otros módulos necesarios
import Parser from "./parser.ts";
import { Program } from "./ast.ts";

// Código fuente de prueba
const sourceCode = `
    let x=5 + 3 * (10 - 4) / 2
`;

// Crea una instancia del parser
const parser = new Parser();

// Genera el AST a partir del código fuente
try {
    const ast: Program = parser.produceAST(sourceCode);
    console.log("Generated AST:", JSON.stringify(ast, null, 2));
} catch (error) {
    console.error("Error while parsing:", error);
}
