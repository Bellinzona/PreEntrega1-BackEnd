const { json } = require("express");
const fs = require("fs");

class CarritoManager {
    static id = 0;

    constructor(path) {
        this.path = path;

        // Inicializa el archivo con un objeto que tiene una propiedad "carritos" que es un array vacío.
        fs.writeFileSync(path, JSON.stringify({ carritos: [] }, null, "\t"));
    }

    async addItem(item) {
        const content = await fs.promises.readFile(this.path, "utf-8");
        const data = JSON.parse(content);

        let itemCarrito = { id: ++CarritoManager.id, items: [] };
        data.carritos.push(itemCarrito); // Agrega el nuevo item al array "carritos".

        await fs.promises.writeFile(this.path, JSON.stringify(data, null, "\t"));
    }

    async addProductinCarrito(id, ProductId) {
        const content = await fs.promises.readFile(this.path, "utf-8");
        const data = JSON.parse(content);
    
        const carritoIndex = data.carritos.findIndex(c => c.id == id);
        let carritoElegido = data.carritos[carritoIndex];
    
        // Buscar si el producto ya existe en el carrito
        const existingProductIndex = carritoElegido.items.findIndex(p => p.item == ProductId);
    
        if (existingProductIndex !== -1) {
            // Si el producto ya existe, incrementar la cantidad
            carritoElegido.items[existingProductIndex].quantity += 1;
        } else {
            // Si el producto no existe, agregarlo con cantidad 1
            carritoElegido.items.push({ item: ProductId, quantity: 1 });
        }
    
        data.carritos[carritoIndex] = carritoElegido;
    
        await fs.promises.writeFile(this.path, JSON.stringify(data, null, "\t"));
    }
    

    async getItems() {
        const content = await fs.promises.readFile(this.path, "utf-8");
        const data = JSON.parse(content);

        console.log(data);

        return data.carritos;
    }

    async getItem(id) {
        const content = await fs.promises.readFile(this.path, "utf-8");
        const data = JSON.parse(content);

        const item = data.carritos.find(c => c.id == id);

        return item;
    }
}

module.exports = CarritoManager;
