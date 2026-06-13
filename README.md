# My Own Language

Un lenguaje de programación interpretado construido desde cero utilizando TypeScript y Deno. Proyecto educativo que implementa los componentes fundamentales de un compilador/interpretador: lexer, parser, AST (Abstract Syntax Tree), intérprete y manejo de entornos.

## Arquitectura

```
Código fuente → Lexer → Parser → AST → Interpreter → Environment
```

## Estructura del Proyecto

```
my_language/
├── frontend/           # Frontend del compilador (análisis)
│   ├── lexer.ts       # Análisis léxico (tokenización)
│   ├── parser.ts      # Análisis sintáctico (parsing)
│   └── ast.ts         # Definición del AST
├── runtime/           # Runtime del lenguaje (ejecución)
│   ├── interpreter.ts # Intérprete del AST
│   ├── values.ts      # Sistema de tipos en runtime
│   └── environments.ts# Manejo de entornos/ámbitos
├── main.ts           # Punto de entrada y REPL
└── deno.json         # Configuración de Deno
```

## Componentes Principales

### 1. Lexer (`frontend/lexer.ts`)
Convierte texto en tokens. Reconoce: números, identificadores, operadores, palabras clave.

**Tokens soportados:**
- `Number`: Literales numéricos
- `Identifier`: Nombres de variables
- `Let`, `Const`: Palabras clave de declaración
- `BinaryOperator`: Operadores (+, -, *, /, %)
- `Equals`: Operador de asignación (=)
- `OpenParen`, `CloseParen`: Paréntesis ()
- `Semicolon`: Punto y coma (;)
- `EOF`: Fin de archivo

### 2. Parser (`frontend/parser.ts`)
Convierte tokens en AST (Abstract Syntax Tree).

**Nodos AST soportados:**
- `Program`: Programa completo
- `VarDeclaration`: Declaración de variables (let/const)
- `AssignmentExpr`: Asignación de variables
- `BinaryExpr`: Expresiones binarias
- `NumericLiteral`: Literales numéricos
- `Identifier`: Identificadores

**Precedencia de operadores:**
- Nivel 1: Multiplicación, división, módulo (*, /, %)
- Nivel 2: Suma, resta (+, -)

### 3. AST (`frontend/ast.ts`)
Estructura de datos que representa el código.

**Tipos de nodos:**
- **Statements (acciones):** `let x = 5;`, `x = 10;`
- **Expressions (cálculos):** `5 + 3`, `x * 2`, `mi_variable`

### 4. Interpreter (`runtime/interpreter.ts`)
Ejecuta el AST nodo por nodo.

**Funciones principales:**
- `eval_program()`: ejecuta lista de statements
- `eval_var_declaration()`: declara variables
- `eval_binary_expr()`: opera con números
- `eval_identifier()`: busca variables
- `eval_assignment()`: asigna valores

### 5. Environment (`runtime/environments.ts`)
Memoria del programa con encadenamiento de ámbitos (scopes).

**Funciones:**
- `declareVar()`: crea variables
- `assignVar()`: modifica variables
- `lookupVar()`: lee variables
- `resolve()`: busca en scopes padres

### 6. Values (`runtime/values.ts`)
Tipos de datos en runtime.

**Tipos soportados:**
- `NumberVal`: Valores numéricos
- `BooleanVal`: Valores booleanos
- `NullVal`: Valor nulo

**Constructores:**
- `MK_NUMBER(n)`: Crea número
- `MK_BOOL(b)`: Crea booleano
- `MK_NULL()`: Crea nulo

## Características del Lenguaje

### Características Actuales:
- ✅ Variables (let, const)
- ✅ Asignación de variables
- ✅ Expresiones aritméticas
- ✅ Números, booleanos, null
- ✅ Operadores binarios (+, -, *, /, %)
- ✅ Paréntesis para agrupación
- ✅ Identificadores
- ✅ REPL interactivo
- ✅ Variables predefinidas (true, false, null)

### Limitaciones Actuales:
- ❌ Sin funciones
- ❌ Sin estructuras de control (if, while, for)
- ❌ Sin strings
- ❌ Sin arrays u objetos
- ❌ Sin manejo de errores robusto

## Cómo Ejecutar

```bash
# Usando Deno
deno run main.ts

# O compilar y ejecutar
deno compile main.ts
./main
```

## Ejemplos de Uso

### Declaración de variables:
```
> let x = 45;
x { value: 45, type: "number" }
```

### Expresiones aritméticas:
```
> 5 + 3 * 2
{ value: 11, type: "number" }

> (10 + 5) / 3
{ value: 5, type: "number" }
```

### Uso de variables:
```
> let x = 35;
x { value: 35, type: "number" }
{ value: 35, type: "number" }

> x/2
{ value: 17.5, type: "number" }
```

### Asignación:
```
> let y = 10;
y { value: 10, type: "number" }

> y = 20;
{ value: 20, type: "number" }
```

### Variables predefinidas:
```
> true
{ type: "boolean", value: true }

> false
{ type: "boolean", value: false }

> null
{ type: "null", value: null }
```

## Estado Actual del Proyecto

**Versión:** 0.1 (Alpha)

**Componentes Funcionales:**
- ✅ Lexer completo
- ✅ Parser funcional (expresiones y declaraciones)
- ✅ Intérprete funcional
- ✅ Sistema de entornos
- ✅ REPL básico

## Configuración Técnica

- **Runtime**: Deno
- **Lenguaje**: TypeScript
- **Módulos**: ES Modules
- **Target**: ES2016

## Contribuciones

El proyecto está diseñado como recurso educativo. Las áreas para contribución incluyen:

1. **Corrección de bugs**: Especialmente en el parser
2. **Nuevas características**: Ampliar el lenguaje
3. **Testing**: Crear suites de prueba
4. **Documentación**: Mejorar guías y ejemplos

---

*Última actualización: Junio 2026*
*Versión: 0.1-alpha*