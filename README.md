# 🎷 The Ecuadorian Big Big Band - Expense Splitter 💰
![Logo](https://andres-coello-goyes.vercel.app/me.jpeg)

Este proyecto resuelve el problema de dividir equitativamente los gastos de viaje de los miembros de una banda de jazz/bachata en Ecuador. Utiliza **TypeScript** con **TDD** y sigue buenas prácticas de código.

> [!NOTE]
> Usar versiones de yarn y node estables para correr esta app, las versiones recomendadas se encuentran en la sección de engines del package.json

---

## 🚀 Características  

✅ Cálculo automático de la cantidad mínima de dinero que debe circular entre los miembros para igualar los gastos.  
✅ Admite la entrada de datos desde la terminal o archivos de texto.  
✅ Validaciones para evitar entradas incorrectas (máximo 100 miembros y $1000 por miembro).  
✅ Código modular con una estructura organizada.  
✅ Pruebas unitarias con **Jest**.  
✅ Logs en formato de tabla para una mejor visualización de los resultados.  

---

## 📂 Estructura del Proyecto  

```sh
📦 src
   ┣ 📂 __tests__ # Pruebas unitarias (TDD)
   ┣ 📂 inputs # Archivos de prueba con datos de entrada
   ┣ 📂 services # Funciones, controladores para logica de negocio.
   ┣ 📂 model # Tipado y modelos de datos (TypeScript, type o interface)
   ┣ 📂 shared
     ┣ 📂 helpers # Funciones auxiliares reutilizables
     ┣ 📂 utils # Funciones de utilidad genéricas
   ┣ 📜 index.ts # Punto de entrada principal
```
---

## 📌 Iniciando

### 1️⃣ Clonar el repositorio  

```sh
git clone https://github.com/GandresCoello18/back-expense-splitter_ac.git
cd back-expense-splitter_ac
```

### 2️⃣ Instalar dependencias

```bash
  yarn install
```

### 3️⃣ Ejecutar en modo desarrollo

```bash
  yarn dev
```

### 4️⃣ Compilar para producción

```bash
  yarn build
```

### 5️⃣ Ejecutar en producción

```bash
  yarn start
```

## 🧪 Pruebas
Ejecutar las pruebas con Jest:

Pruebas unitarias
```bash
  yarn test:unit
```

Pruebas unitarias y coverage
```bash
  yarn test:coverage
```

### 📷 Ejemplo:
![Test coverage](https://firebasestorage.googleapis.com/v0/b/meniuz.appspot.com/o/tinkin%2Fcoverage-test.png?alt=media)

## ⚙️ Script de desarollo

Formatear código
```bash
  yarn format:fix
```

Análisis y patrones de error en código
```bash
  yarn lint:fix
```

## 📌 Ejecución
Puedes ingresar los datos de forma interactiva o desde un archivo de texto, para hacerlo de forma manual se requiere responder una serie de preguntas para ordenar los datos a procesar.

1) Digite el número de miembros
2) Digite el gasto del miembro #.
3) Se completa y se registra el viaje, vuelve a digitar el número de miembros o presiona 0 para terminar los datos de entrada.
4) Muestra resultado por log en formato de tabla.

Para usar el método de cálculo por medio de archivo de texto se requiere adjuntar el path o ruta del archivo con formato .txt seguido del script de ejecución, en caso de no ser encontrado dicho archivo, el programa emite un mensaje de alerta y termina la ejecución. Es importante tomar en cuenta el - [signo > dentro del archivo](https://github.com/GandresCoello18/back-expense-splitter_ac/blob/master/src/inputs/example.txt), ya que significa un salto de línea o un nuevo viaje para los miembros. En este repositorio se encuentra un archivo que puede ser usado en la ejecución del programa, dentro de la carpeta /inputs y a continuación se muestra ejemplos para ello.

### 🔹 Entrada de datos manual

Puedes usar dev para desarrollo o start para producción
```bash
  yarn dev o yarn start
```

Luego, ingresa:
```bash
  3
  100.01
  99.99
  99.99
  0
```

### 📷 Ejemplo:
![Proceso manual](https://firebasestorage.googleapis.com/v0/b/meniuz.appspot.com/o/tinkin%2Fmanual.png?alt=media)

### 🔹 Usando un archivo de entrada

Puedes usar dev para desarrollo o start para producción

```bash
  yarn dev:file:example
```
o
```bash
  yarn start:file:example
```
o
```bash
  yarn start src/inputs/example.txt
```

### 📷 Ejemplo:
![Proceso por archivo](https://firebasestorage.googleapis.com/v0/b/meniuz.appspot.com/o/tinkin%2Fautomati.png?alt=media)

### 🔒 Validaciones Implementadas

```bash
✔️ Máximo 100 miembros por viaje.
✔️ Gasto máximo de $1000 por persona.
✔️ Se buscan valores incorrectos (ej. "$99y.66").
✔️ La cantidad de miembros debe especificarse antes de los gastos.
✔️ Se finaliza la entrada de datos al ingresar 0.
```

### 📌 Ejemplo de Salida

```bash
📊 Resultados:  
-----------------------------
✈️  Viaje #1: $10.00 💰  
✈️  Viaje #2: $11.99 💰  
✈️  Viaje #3: $11.99 💰  
✈️  Viaje #4: $0.07 💰  
✈️  Viaje #5: $0.00 💰  
-----------------------------
```

## Construido con 🛠️

_Para el desarrollo de esta app se utilizo las siguientes herramientas._

- [Node.js](https://nodejs.org/en) - Entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor basado en el lenguaje de programación JavaScript, asíncrono.
- [TypeScript](https://www.typescriptlang.org/) - Lenguaje de programación libre y de código abierto desarrollado y mantenido por Microsoft.
- [Prettier](https://prettier.io/) - Prettier es un formateador de código con soporte para js, ts, etc.
- [ESLint](https://eslint.org/) - Herramienta de análisis de código estático para identificar patrones problemáticos que se encuentran en el código JavaScript.
- [commitlint](https://commitlint.js.org/) - Ayuda a su equipo a adherirse a una convención de confirmación.
- [Jest](https://jestjs.io/) - Jest es un encantador marco de pruebas de JavaScript centrado en la simplicidad.
- [Readme so](https://readme.so/) - Agregar y personalizar rápidamente todas las secciones que necesita para el archivo README de su proyecto.

## Autores ✒️

- **Andrés Coello** - _Developer Full Stack_ - [Andres Coello](https://www.instagram.com/coellogoyes/)

#### 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://andres-coello-goyes.vercel.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/andr%C3%A9s-roberto-coello-goyes/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/AndresC79085858)

## Expresiones de Gratitud 🎁

- Pasate por mi perfil para ver algun otro proyecto 📢
- Desarrollemos alguna app juntos, puedes escribirme en mis redes.
- Muchas gracias por pasarte por este proyecto 🤓.
