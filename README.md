
# Pre-Entrega: Herramienta de Gestión de Productos vía Terminal (TechLab) 🚀

Este proyecto consiste en una herramienta funcional desarrollada en **Node.js** para interactuar con una tienda en línea desde la terminal de comandos. Permite listar, consultar, crear y eliminar productos mediante peticiones HTTP asincrónicas, cumpliendo con los estándares modernos de JavaScript.

---

## 🛠️ Tecnologías y Conceptos Aplicados

* **Node.js** como entorno de ejecución.
* **ES Modules (`import/export`)** habilitados mediante la propiedad `"type": "module"` en el `package.json`.
* **Asincronismo avanzado** mediante el uso nativo de `async/await` y la API `fetch`.
* **Procesamiento de argumentos de consola** mediante el uso del array nativo `process.argv` y métodos de manipulación de arrays y strings (`.slice()`, `.join()`, `.trim()`, `.toLowerCase()`, etc.).
* **Manipulación eficiente de datos** implementando estructuras de Desestructuración (*Destructuring*) y Operador de Propagación (*Spread Operator*).
* **Estructura clara y modular** dividiendo las responsabilidades en capas independientes (`index.js` como orquestador y `api.js` como módulo de servicios externos).

---

## 📜 Bitácora de Desarrollo y Resolución de Problemas (Troubleshooting)

Durante el ciclo de desarrollo de la preentrega, el proyecto evolucionó a través de diferentes fases operativas debido a contingencias con los proveedores de servicios externos:

1. **Fase 1: Implementación Inicial (FakeStoreAPI - Fallida)**Se estructuró el entorno inicial y se codificó la capa de servicios apuntando a la URL oficial de *FakeStoreAPI*. Al realizar los testeos de ejecución, el programa experimentaba fallos en el procesamiento de datos.
2. **Fase 2: Diagnóstico e Inspección de Respuestas**Se modificó el módulo de datos para implementar un sistema de detección y filtrado de errores. Mediante la inspección del encabezado `content-type` y el volcado de texto plano (`res.text()`), se descubrió que la plataforma externa *FakeStoreAPI* se encontraba completamente caída, devolviendo una estructura HTML de error en lugar del JSON requerido.
3. **Fase 3: Contingencia con Almacenamiento Local (Mocking de Datos - Operativa)**Para asegurar la continuidad de las pruebas locales y evitar el bloqueo del desarrollo, se construyó un mecanismo de respaldo híbrido. El sistema intentaba conectar con la API externa pero, ante un fallo de red o formato inválido, conmutaba de forma automática a un archivo local de resguardo (`productos.json`) mediante el uso del módulo de sistema de archivos `fs/promises`.
4. **Fase 4: Migración Definitiva y Solución Final (DummyJSON - Exitosa)**
   Con el fin de garantizar una solución real y conectada al 100% con un servidor externo en tiempo de ejecución, se realizó la migración del módulo de conectividad hacia **DummyJSON**. Se adaptó el formateo de datos (procesando el objeto contenedor de la propiedad `.products`) logrando que el programa opere de forma integrada con éxito y responda en tiempo real a todas las directivas solicitadas por la consigna.

---

## 💻 Modos de Uso en Consola

Para ejecutar los requerimientos de la consigna, la terminal integrada debe iniciar el flujo mediante el script configurado `npm run start`, seguido de la acción (`GET`, `POST`, `DELETE`) y el recurso correspondiente:

### 1. Consultar todos los productos

Efectúa una petición asíncrona para recuperar y listar la totalidad de los ítems en pantalla:

```bash
npm run start GET products
```

### 2. Consultar un producto específico

Recupera y despliega de forma detallada la información exclusiva del identificador provisto:

```bash
npm run start GET products/15
```

### 3. Crear un producto nuevo

Envía una solicitud para añadir una nueva entidad con las propiedades especificadas:

```bash
npm run start POST products "Título del Producto" 350 "Categoría"
```

### 4. Eliminar un producto

Inicia una solicitud de remoción sobre el identificador seleccionado indicando el resultado en la consola:

```bash
npm run start DELETE products/7
```
