import { obtenerTodos, obtenerPorId, crearProducto, eliminarProducto } from './api.js';

// Capturamos los argumentos de consola omitiendo las rutas por defecto
const args = process.argv.slice(2);

async function ejecutar() {
    if (args.length === 0) {
        console.log("❌ Error: No se ingresaron comandos.");
        console.log("💡 Modos de uso:\n - npm run start GET products\n - npm run start GET products/<id>\n - npm run start POST products <title> <price> <category>\n - npm run start DELETE products/<id>");
        return;
    }

    const accion = args[0].toUpperCase(); // GET, POST, DELETE
    const recurso = args[1] || '';        // products, products/15, etc.

    // --- CASO 1 Y 2: CONSULTAS (GET) ---
    if (accion === 'GET' && recurso.startsWith('products')) {

        // ¿Pide un ID específico? (Ej: products/15)
        if (recurso.includes('/')) {
            const [, id] = recurso.split('/'); // Método de string e interpretación
            if (!id) {
                console.log("❌ Error: Debes especificar un ID válido. Ejemplo: products/15");
                return;
            }
            console.log(`🔄 Buscando producto con ID: ${id}...`);
            const prod = await obtenerPorId(id);

            if (prod) {
                // Destructuring para manipular datos limpiamente
                const { id: prodId, title, price, ...resto } = prod;
                console.log(`\n📦 Producto Encontrado:\nID: ${prodId}\nTítulo: ${title}\nPrecio: $${price}\nCategoría: ${resto.category}`);
            } else {
                console.log("❌ No se encontró el producto.");
            }
        }
        // ¿Pide todos los productos? (Ej: products)
        else if (recurso === 'products') {
            console.log("🔄 Cargando listado completo de productos...");
            const lista = await obtenerTodos();
            if (lista) {
                console.log(`\n📦 --- LISTADO DE PRODUCTOS (${lista.length} ítems) ---`);
                lista.forEach(item => {
                    const copia = { ...item }; // Spread operator para manipular eficientemente
                    console.log(`[ID: ${copia.id}] ${copia.title} - $${copia.price}`);
                });
            }
        }
    }

    // --- CASO 3: CREAR PRODUCTO (POST) ---
    else if (accion === 'POST' && recurso === 'products') {
        // Obtenemos los argumentos específicos de creación
        const [, , title, price, category] = args;

        if (!title || !price || !category) {
            console.log("❌ Error: Faltan datos para el POST.");
            console.log("💡 Formato: npm run start POST products <title> <price> <category>");
            return;
        }

        console.log(`🔄 Creando producto: "${title}"...`);
        const nuevoProd = await crearProducto({ title, price: parseFloat(price), category });

        if (nuevoProd) {
            console.log("\n✅ ¡Producto creado exitosamente en la API!");
            console.log(nuevoProd);
        }
    }

    // --- CASO 4: ELIMINAR PRODUCTO (DELETE) ---
    else if (accion === 'DELETE' && recurso.startsWith('products/')) {
        const [, id] = recurso.split('/');

        if (!id) {
            console.log("❌ Error: Debes especificar un ID. Ejemplo: products/7");
            return;
        }

        console.log(`🔄 Solicitando eliminación del producto ID: ${id}...`);
        const eliminado = await eliminarProducto(id);

        if (eliminado) {
            console.log(`\n✅ El producto con ID ${id} fue marcado como eliminado en el servidor.`);
            console.log(eliminado);
        }
    }

    // --- COMANDO NO RECONOCIDO ---
    else {
        console.log("❌ Comando o formato no reconocido.");
    }
}

ejecutar();
