import Environment from "./runtime/environments.ts";
import { MK_NULL, MK_BOOL, MK_NUMBER } from "./runtime/values.ts";

console.log("=== Ejemplo de uso de Environment y Values ===");

// Crear entorno global
const globalEnv = new Environment();

// Declarar variables en entorno global
console.log("\n1. Declarando variables en entorno global:");
globalEnv.declareVar("x", MK_NUMBER(10));
globalEnv.declareVar("y", MK_BOOL(true));
globalEnv.declareVar("z", MK_NULL());

// Buscar variables
console.log("x =", globalEnv.lookupVar("x"));
console.log("y =", globalEnv.lookupVar("y"));
console.log("z =", globalEnv.lookupVar("z"));

// Crear entorno local (hijo del global)
const localEnv = new Environment(globalEnv);

// Declarar variable local
console.log("\n2. Creando entorno local y declarando variable:");
localEnv.declareVar("x", MK_NUMBER(20)); // Sombrea la variable global

console.log("x en entorno local =", localEnv.lookupVar("x")); // 20
console.log("y en entorno local =", localEnv.lookupVar("y")); // true (del global)

// Modificar variables
console.log("\n3. Modificando variables:");
localEnv.assignVar("y", MK_BOOL(false)); // Modifica la variable global
console.log("y después de asignación =", localEnv.lookupVar("y")); // false

// El entorno global no ve la variable local x
console.log("\n4. Visibilidad entre entornos:");
console.log("x en entorno global =", globalEnv.lookupVar("x")); // 10 (sin cambios)
console.log("x en entorno local =", localEnv.lookupVar("x"));  // 20

// Error: variable no declarada
try {
    console.log("\n5. Intentando acceder a variable inexistente:");
    globalEnv.lookupVar("inexistente");
} catch (error) {
    console.log("Error:", error);
}

console.log("\n=== Fin del ejemplo ===");
