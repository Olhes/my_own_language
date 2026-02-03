import { Program, NumericLiteral, BinaryExpr, Identifier } from './ast.ts';

// Crear un nodo de tipo NumericLiteral
const numLiteral: NumericLiteral = {
  kind: "NumericLiteral",
  value: 42,
};

// Crear un nodo de tipo Identifier
const identifier: Identifier = {
  kind: "Identifier",
  symbol: "x",
};

// Crear un nodo de tipo BinaryExpr
const binaryExpr: BinaryExpr = {
  kind: "BinaryExpr",
  left: numLiteral,
  right: identifier,
  operator: "+",
};

// Crear un programa que utiliza estos nodos
const program: Program = {
  kind: "Program",
  body: [binaryExpr],
};

console.log("AST Example:", program);
