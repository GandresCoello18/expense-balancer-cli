# 🎷 The Ecuadorian Big Big Band - Expense Splitter 💰

> **Calculadora de gastos compartidos** que divide equitativamente los gastos de viaje entre los miembros de un grupo.

---

## 📖 ¿Qué hace este programa?

Cuando un grupo de personas realiza un viaje juntos, cada quien paga gastos diferentes. Este programa calcula **cuánto dinero debe moverse entre las personas** para que todos paguen exactamente lo mismo al final.

### Ejemplo práctico:

Imagina que 3 amigos van de viaje:
- **Persona 1** gastó $100
- **Persona 2** gastó $50  
- **Persona 3** gastó $50

El gasto total es $200, así que cada uno debería pagar $66.67.

El programa calcula que:
- La Persona 1 debe recibir $33.33 de las otras dos
- Las Personas 2 y 3 deben pagar $16.67 cada una a la Persona 1

**Resultado:** El programa muestra que se deben transferir **$33.33** en total para equilibrar los gastos.

---

## 🚀 Características principales

✅ **Cálculo automático** - Calcula la cantidad mínima de dinero que debe circular entre miembros  
✅ **Entrada flexible** - Acepta datos desde la terminal (interactivo) o archivos de texto  
✅ **Validaciones** - Protege contra errores: máximo 100 miembros y $1000 por persona  
✅ **Resultados claros** - Muestra los resultados en formato de tabla fácil de leer  
✅ **Código robusto** - Arquitectura limpia con pruebas unitarias  

---

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una **arquitectura limpia** organizada en capas:

```
📦 src
   ┣ 📂 domain              # Lógica de negocio pura (reglas del cálculo)
   │   ├── calculator/      # Algoritmo de cálculo de gastos
   │   └── types/           # Tipos y modelos de datos
   │
   ┣ 📂 application         # Casos de uso y servicios
   │   ├── use-cases/       # Lógica de aplicación
   │   └── services/        # Orquestación de casos de uso
   │
   ┣ 📂 infrastructure      # Comunicación con el exterior
   │   ├── input/           # Lectura de datos (archivo/consola)
   │   └── output/          # Presentación de resultados
   │
   ┣ 📂 shared              # Utilidades compartidas
   │   ├── constants/       # Constantes del sistema
   │   ├── errors/          # Clases de errores personalizadas
   │   └── validation/      # Validadores reutilizables
   │
   ┣ 📂 __tests__           # Pruebas unitarias
   ┣ 📂 inputs              # Archivos de ejemplo para pruebas
   └ 📜 index.ts            # Punto de entrada principal
```

---

## 📌 Inicio rápido

### Prerrequisitos

- **Node.js** >= 20.19.0
- **Yarn** >= 1.22.19

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/GandresCoello18/back-expense-splitter_ac.git
   cd back-expense-splitter_ac
   ```

2. **Instalar dependencias**
   ```bash
   yarn install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   yarn dev
   ```

4. **Compilar para producción**
   ```bash
   yarn build
   yarn start
   ```

---

## 💻 Uso del programa

El programa puede recibir datos de **dos formas**:

### 🔹 Opción 1: Entrada manual (interactiva)

Ideal para ingresar datos directamente desde la terminal.

```bash
yarn dev
# o
yarn start
```

**Pasos:**
1. Ingresa el número de miembros del primer viaje
2. Ingresa el gasto de cada miembro (uno por uno)
3. Repite para más viajes o ingresa `0` para terminar
4. El programa mostrará los resultados en una tabla

**Ejemplo de interacción:**
```bash
Digite el número de miembros (0 para salir): 3
Gasto para el miembro #1: 100.01
Gasto para el miembro #2: 99.99
Gasto para el miembro #3: 99.99
✅ Viaje registrado: 100.01,99.99,99.99
Digite el número de miembros (0 para salir): 0

📊 Resultados: 👇
┌─────────┬─────────┬─────────────┐
│ (index) │ Viaje   │ Monto       │
├─────────┼─────────┼─────────────┤
│ 0       │ '#1 ✈️ ' │ '$0.00 💰'  │
└─────────┴─────────┴─────────────┘
```

### 🔹 Opción 2: Entrada por archivo

Ideal para procesar múltiples viajes a la vez usando un archivo de texto.

**Formato del archivo:**
- Cada línea con `$` seguido del gasto (ej: `$100.50`)
- Usa `>` para separar viajes diferentes
- Acepta comas o puntos como separador decimal

**Ejemplo de archivo (`src/inputs/example.txt`):**
```
$10,00
$20,00
$30,00
>
$15,00
$15,01
$3,00
$3,01
```

**Ejecutar:**
```bash
# Con el archivo de ejemplo
yarn dev:file:example
# o
yarn start:file:example

# Con tu propio archivo
yarn dev src/inputs/mi-archivo.txt
# o
yarn start src/inputs/mi-archivo.txt
```

### 📷 Ejemplo:
![Proceso manual](https://firebasestorage.googleapis.com/v0/b/meniuz.appspot.com/o/tinkin%2Fmanual.png?alt=media)

---

## 🧪 Pruebas

El proyecto incluye pruebas unitarias completas usando **Jest**.

```bash
# Ejecutar todas las pruebas
yarn test:unit

# Ejecutar pruebas en modo watch (desarrollo)
yarn test:watch

# Ejecutar pruebas con cobertura de código
yarn test:coverage
```

### 📷 Ejemplo:
![Test coverage](https://firebasestorage.googleapis.com/v0/b/meniuz.appspot.com/o/tinkin%2Fcoverage-test.png?alt=media)

**Cobertura actual:** El proyecto mantiene una alta cobertura de pruebas para garantizar la calidad del código.

---

## ⚙️ Scripts de desarrollo

```bash
# Formatear código automáticamente
yarn format:fix

# Verificar formato sin cambios
yarn format:check

# Corregir problemas de linting
yarn lint:fix

# Limpiar archivos compilados
yarn clean

# Compilar TypeScript
yarn build
```

---

## 🔒 Validaciones implementadas

El programa incluye las siguientes validaciones para garantizar datos correctos:

| Validación | Descripción |
|------------|-------------|
| **Máximo de miembros** | Hasta 100 miembros por viaje |
| **Límite de gasto** | Máximo $1000 por persona |
| **Formato numérico** | Valores deben ser números válidos (rechaza "abc", "$99y.66", etc.) |
| **Orden de entrada** | Primero número de miembros, luego gastos |
| **Finalización** | Ingresa `0` para terminar la entrada de datos |

---

## 📊 Ejemplo de salida

Cuando ejecutas el programa, verás resultados como estos:

```
📊 Resultados: 👇
┌─────────┬─────────┬─────────────┐
│ (index) │ Viaje   │ Monto       │
├─────────┼─────────┼─────────────┤
│ 0       │ '#1 ✈️ ' │ '$10.00 💰' │
│ 1       │ '#2 ✈️ ' │ '$11.99 💰' │
│ 2       │ '#3 ✈️ ' │ '$11.99 💰' │
│ 3       │ '#4 ✈️ ' │ '$0.07 💰'  │
│ 4       │ '#5 ✈️ ' │ '$0.00 💰'  │
└─────────┴─────────┴─────────────┘
```

Cada fila muestra:
- **Viaje**: Número del viaje procesado
- **Monto**: Cantidad mínima de dinero que debe circular para equilibrar los gastos

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Propósito |
|------------|-----------|
| [Node.js](https://nodejs.org/) | Entorno de ejecución JavaScript |
| [TypeScript](https://www.typescriptlang.org/) | Lenguaje de programación con tipado estático |
| [Jest](https://jestjs.io/) | Framework de pruebas unitarias |
| [ESLint](https://eslint.org/) | Linter para mantener calidad de código |
| [Prettier](https://prettier.io/) | Formateador de código automático |
| [commitlint](https://commitlint.js.org/) | Validación de mensajes de commit |

---

## 📝 Conceptos técnicos (para desarrolladores)

### Algoritmo de cálculo

El programa utiliza el siguiente algoritmo:

1. **Conversión a centavos**: Todos los valores se convierten a centavos para evitar errores de punto flotante
2. **Cálculo del promedio**: Se calcula cuánto debería pagar cada persona (total ÷ número de personas)
3. **Diferencias**: Se calcula la diferencia entre lo que pagó cada uno y el promedio
4. **Intercambio mínimo**: Se suma la diferencia positiva y negativa, el mínimo entre ambos es el resultado

### Arquitectura

- **Domain Layer**: Contiene la lógica de negocio pura, sin dependencias externas
- **Application Layer**: Orquesta los casos de uso y coordina el dominio con la infraestructura
- **Infrastructure Layer**: Maneja I/O (archivos, consola) y detalles de implementación
- **Shared Layer**: Utilidades y constantes compartidas

### Manejo de errores

El proyecto utiliza clases de error personalizadas:
- `ValidationError`: Errores de validación de entrada
- `FileReadError`: Errores al leer archivos
- `FileParseError`: Errores al parsear el contenido de archivos

---

## 👤 Autor

**Andrés Coello Goyes** - SOFTWARE ENGINEER

#### 🔗 Enlaces

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://andres-coello-goyes.vercel.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/andrescoellogoyes/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/acoellogoyes)

---

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

---

## 🎁 Agradecimientos

- Gracias por revisar este proyecto 📢
- ¿Tienes ideas para mejorar? ¡Escríbeme!
- Si te fue útil, considera darle una ⭐ al repositorio

---

⌨️ con ❤️ por [Andres Coello Goyes](https://linktr.ee/gandrescoello) 😊

<img width="400" height="400" alt="1764558900283" src="https://github.com/user-attachments/assets/cde88968-7856-49ec-bdb1-53a82bf9caa3" />
