const { json } = require("express");
const fs = require("fs");

class ItemsManager {
    static id = 0;

    constructor(path) {
        this.path = path;

        // Inicializa el archivo con un objeto que tiene una propiedad "items" que es un array vacío.
        fs.writeFileSync(path, JSON.stringify({ items: [] }, null, "\t"));
    }

    async addItem(item) {
        const content = await fs.promises.readFile(this.path, "utf-8");
        const data = JSON.parse(content);

        item.id = ++ItemsManager.id;
        data.items.push(item); // Agrega el nuevo item al array "items".

        await fs.promises.writeFile(this.path, JSON.stringify(data, null, "\t"));
    }

    async updateItem(id, updatedItem) {
        const content = await fs.promises.readFile(this.path, "utf-8");
        const data = JSON.parse(content);
    
        const itemIndex = data.items.findIndex(i => i.id == id);
    
        if (itemIndex !== -1) {
            // Si el producto existe, actualizar sus propiedades
            data.items[itemIndex] = { ...data.items[itemIndex], ...updatedItem };
    
            await fs.promises.writeFile(this.path, JSON.stringify(data, null, "\t"));
    
            return data.items;
        } else {
            // Si el producto no existe, devolver null o lanzar un error según tu preferencia
            return null;
        }
    }
    async deleteItem(id) {
        const content = await fs.promises.readFile(this.path, "utf-8");
        const data = JSON.parse(content);
    
        const itemIndex = data.items.findIndex(i => i.id == id);
    
        if (itemIndex !== -1) {
            // Si el producto existe, eliminarlo del array
            data.items.splice(itemIndex, 1);
    
            await fs.promises.writeFile(this.path, JSON.stringify(data, null, "\t"));
    
            return data.items;
        } else {
            // Si el producto no existe, devolver null o lanzar un error según tu preferencia
            return null;
        }
    }
    
    
    async getItems() {
        const content = await fs.promises.readFile(this.path, "utf-8");
        const data = JSON.parse(content);

        console.log(data.items);

        return data.items;
    }

    async getItem(id) {
        const content = await fs.promises.readFile(this.path, "utf-8");
        const data = JSON.parse(content);

        const item = data.items.find(i => i.id == id);

        return item;
    }
}

module.exports = ItemsManager;
