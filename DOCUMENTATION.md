# My Own Language - Documentación del Proyecto

## Resumen del Proyecto

**My Own Language** es un lenguaje de programación interpretado construido desde cero utilizando TypeScript y Deno. Es un proyecto educativo que implementa las componentes fundamentales de un compilador/interpretador: lexer, parser, AST (Abstract Syntax Tree), intérprete y manejo de entornos.

## Arquitectura General

El proyecto sigue una arquitectura modular clásica de compiladores:

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
└── tsconfig.json     # Configuración de TypeScript
```

## Componentes Detallados

### 1. Frontend del Compilador

#### 1.1 Lexer (`frontend/lexer.ts`)
**Responsabilidad**: Convertir código fuente en tokens

- **Tokens soportados**:
  - `Number`: Literales numéricos
  - `Identifier`: Nombres de variables
  - `Let`, `Const`: Palabras clave de declaración
  - `BinaryOperator`: Operadores (+, -, *, /, %)
  - `Equals`: Operador de asignación (=)
  - `OpenParen`, `CloseParen`: Paréntesis ()
  - `Semicolon`: Punto y coma (;)
  - `EOF`: Fin de archivo

- **Funciones clave**:
  - `tokenize(sourceCode: string): Token[]`: Función principal de tokenización
  - Utiliza reconocimiento de patrones para números, identificadores y operadores

#### 1.2 Parser (`frontend/parser.ts`)
**Responsabilidad**: Construir el AST a partir de tokens

- **Nodos AST soportados**:
  - `Program`: Programa completo
  - `VarDeclaration`: Declaración de variables (let/const)
  - `BinaryExpr`: Expresiones binarias
  - `NumericLiteral`: Literales numéricos
  - `Identifier`: Identificadores

- **Precedencia de operadores**:
  - Nivel 1: Multiplicación, división, módulo (*, /, %)
  - Nivel 2: Suma, resta (+, -)

- **Funciones principales**:
  - `produceAST(sourceCode: string): Program`: Punto de entrada
  - `parse_stmt()`: Parseo de sentencias
  - `parse_expr()`: Parseo de expresiones con precedencia

#### 1.3 AST (`frontend/ast.ts`)
**Responsabilidad**: Definir la estructura de datos del árbol sintáctico

- **Tipos de nodos**:
  - Sentencias: `Program`, `VarDeclaration`
  - Expresiones: `NumericLiteral`, `Identifier`, `BinaryExpr`

### 2. Runtime del Lenguaje

#### 2.1 Intérprete (`runtime/interpreter.ts`)
**Responsabilidad**: Ejecutar el AST y producir resultados

- **Funciones de evaluación**:
  - `evaluate(astNode: Stmt, env: Environment): RuntimeVal`: Función principal
  - `eval_program()`: Ejecuta programas completos
  - `eval_binary_expr()`: Evalúa expresiones binarias
  - `eval_identifier()`: Resuelve identificadores

- **Operaciones soportadas**:
  - Aritmética: +, -, *, /, %
  - Acceso a variables

#### 2.2 Sistema de Tipos (`runtime/values.ts`)
**Responsabilidad**: Definir valores en tiempo de ejecución

- **Tipos soportados**:
  - `NumberVal`: Valores numéricos
  - `BooleanVal`: Valores booleanos
  - `NullVal`: Valor nulo

- **Constructores**:
  - `MK_NUMBER(n)`: Crea número
  - `MK_BOOL(b)`: Crea booleano
  - `MK_NULL()`: Crea nulo

#### 2.3 Entornos (`runtime/environments.ts`)
**Responsabilidad**: Manejo de ámbitos y variables

- **Características**:
  - Encadenamiento de entornos (parent-child)
  - Declaración de variables: `declareVar()`
  - Asignación: `assignVar()`
  - Búsqueda: `lookupVar()`
  - Resolución de ámbito: `resolve()`

### 3. Punto de Entrada (`main.ts`)

**Responsabilidad**: Inicializar y ejecutar el REPL (Read-Eval-Print Loop)

- **Funcionalidades**:
  - Inicializa parser y entorno global
  - Declara variables predefinidas (x=100, true, false, null)
  - Bucle interactivo con prompt `>`
  - Comando `exit` para salir

## Características del Lenguaje

### Características Actuales:
- ✅ Variables (let, const)
- ✅ Expresiones aritméticas
- ✅ Números, booleanos, null
- ✅ Operadores binarios (+, -, *, /, %)
- ✅ Paréntesis para agrupación
- ✅ Identificadores
- ✅ REPL interactivo

### Limitaciones Actuales:
- ❌ Sin funciones
- ❌ Sin estructuras de control (if, while, for)
- ❌ Sin strings
- ❌ Sin arrays u objetos
- ❌ Sin manejo de errores robusto
- ❌ Parser incompleto para declaraciones de variables

## Ejemplos de Uso

### Expresiones Aritméticas:
```
> 5 + 3 * 2
Resultado: { type: "number", value: 11 }

> (10 + 5) / 3
Resultado: { type: "number", value: 5 }
```

### Variables Predefinidas:
```
> x + 50
Resultado: { type: "number", value: 150 }

> true
Resultado: { type: "boolean", value: true }
```

## Estado Actual del Proyecto

### Versión: 0.1 (Alpha)

### Componentes Funcionales:
- ✅ Lexer completo
- ✅ Parser parcial (expresiones funcionales)
- ✅ Intérprete funcional
- ✅ Sistema de entornos
- ✅ REPL básico

### Issues Conocidos:
1. **Parser incompleto**: La función `parse_var_declaration()` está truncada y no completa el parsing de declaraciones de variables
2. **Sin manejo de asignación**: No se puede asignar valores a variables en el REPL
3. **Errores de sintaxis**: El parser puede fallar con expresiones complejas

## Próximos Pasos Recomendados

### Prioridad Alta:
1. **Completar el parser**: Terminar `parse_var_declaration()`
2. **Implementar asignación**: Soporte para `x = 10`
3. **Mejorar manejo de errores**: Mensajes más descriptivos

### Prioridad Media:
1. **Agregar strings**: Soporte para literales de cadena
2. **Estructuras de control**: if, while básicos
3. **Funciones simples**: Declaración y llamada

### Prioridad Baja:
1. **Optimización**: Mejorar rendimiento del intérprete
2. **Testing**: Suite de pruebas automatizadas
3. **Documentación**: Comentarios inline y ejemplos

## Configuración Técnica

- **Runtime**: Deno
- **Lenguaje**: TypeScript (ES2016)
- **Módulos**: CommonJS
- **Type Checking**: Strict mode habilitado
- **Target**: ES2016

## Cómo Ejecutar

```bash
# Usando Deno
deno run main.ts

# O compilar y ejecutar
deno compile main.ts
./main
```

## Contribuciones

El proyecto está diseñado como recurso educativo. Las áreas para contribución incluyen:

1. **Corrección de bugs**: Especialmente en el parser
2. **Nuevas características**: Ampliar el lenguaje
3. **Testing**: Crear suites de prueba
4. **Documentación**: Mejorar guías y ejemplos

---

*Última actualización: Febrero 2026*
*Versión: 0.1-alpha*
