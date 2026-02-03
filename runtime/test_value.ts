// test_values.ts

// Importa todo lo necesario de tu archivo values.ts
import { 
   
     
    MK_NULL, 
    MK_BOOL, 
    MK_NUMBER,
 
} from './values.ts';

console.log("--- Iniciando pruebas para values.ts ---");

// --- PRUEBA 1: Función MK_NULL() ---
const nullValue = MK_NULL();
console.log("\nPrueba MK_NULL():");
console.log("Objeto retornado:", nullValue);
console.log("Tipo:", nullValue.type);
console.log("Valor:", nullValue.value);

// Verificaciones de tipo (TypeScript ayuda, pero esto valida la lógica en tiempo de ejecución)
if (nullValue.type === "null" && nullValue.value === null) {
    console.log("  => MK_NULL() PASÓ: Tipo y valor correctos.");
} else {
    console.log("  => MK_NULL() FALLÓ: Tipo o valor incorrectos.");
}

// Comprobación de que es de tipo RuntimeVal

console.log("  Es compatible con RuntimeVal.");


// --- PRUEBA 2: Función MK_BOOL() ---
const trueValue = MK_BOOL(true);
console.log("\nPrueba MK_BOOL(true):");
console.log("Objeto retornado:", trueValue);
console.log("Tipo:", trueValue.type);
console.log("Valor:", trueValue.value);

if (trueValue.type === "boolean" && trueValue.value === true) {
    console.log("  => MK_BOOL(true) PASÓ: Tipo y valor correctos.");
} else {
    console.log("  => MK_BOOL(true) FALLÓ: Tipo o valor incorrectos.");
}

const falseValue = MK_BOOL(false);
console.log("\nPrueba MK_BOOL(false):");
console.log("Objeto retornado:", falseValue);
console.log("Tipo:", falseValue.type);
console.log("Valor:", falseValue.value);

if (falseValue.type === "boolean" && falseValue.value === false) {
    console.log("  => MK_BOOL(false) PASÓ: Tipo y valor correctos.");
} else {
    console.log("  => MK_BOOL(false) FALLÓ: Tipo o valor incorrectos.");
}

const defaultBoolValue = MK_BOOL(); // Sin argumento, debe ser true
console.log("\nPrueba MK_BOOL() (por defecto):");
console.log("Objeto retornado:", defaultBoolValue);
if (defaultBoolValue.type === "boolean" && defaultBoolValue.value === true) {
    console.log("  => MK_BOOL() por defecto PASÓ: Tipo y valor correctos.");
} else {
    console.log("  => MK_BOOL() por defecto FALLÓ: Tipo o valor incorrectos.");
}


// --- PRUEBA 3: Función MK_NUMBER() ---
const positiveNumber = MK_NUMBER(42);
console.log("\nPrueba MK_NUMBER(42):");
console.log("Objeto retornado:", positiveNumber);
console.log("Tipo:", positiveNumber.type);
console.log("Valor:", positiveNumber.value);

if (positiveNumber.type === "number" && positiveNumber.value === 42) {
    console.log("  => MK_NUMBER(42) PASÓ: Tipo y valor correctos.");
} else {
    console.log("  => MK_NUMBER(42) FALLÓ: Tipo o valor incorrectos.");
}

const negativeNumber = MK_NUMBER(-10.5);
console.log("\nPrueba MK_NUMBER(-10.5):");
console.log("Objeto retornado:", negativeNumber);
if (negativeNumber.type === "number" && negativeNumber.value === -10.5) {
    console.log("  => MK_NUMBER(-10.5) PASÓ: Tipo y valor correctos.");
} else {
    console.log("  => MK_NUMBER(-10.5) FALLÓ: Tipo o valor incorrectos.");
}

const defaultNumber = MK_NUMBER(); // Sin argumento, debe ser 0
console.log("\nPrueba MK_NUMBER() (por defecto):");
console.log("Objeto retornado:", defaultNumber);
if (defaultNumber.type === "number" && defaultNumber.value === 0) {
    console.log("  => MK_NUMBER() por defecto PASÓ: Tipo y valor correctos.");
} else {
    console.log("  => MK_NUMBER() por defecto FALLÓ: Tipo o valor incorrectos.");
}


console.log("\n--- Pruebas para values.ts finalizadas ---");