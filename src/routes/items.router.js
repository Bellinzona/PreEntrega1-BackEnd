const { Router } = require("express");
const ItemsManager = require("../itemsManager");

const router = Router();

const manager = new ItemsManager(__dirname + "/../files/items.json");

router.get("/", async (req, res) => {
    let items = await manager.getItems();

    console.log(items)
    
    const { limit } = req.query;
    if (limit) {
        items = items.slice(0, limit);
    }

    res.send({ items: items });
});

router.get("/:iid", async (req, res) => {
    const id = req.params.iid
    const item = await manager.getItem(id)

    if (!item){
        res.status(400).send({message:"cualuier cosa"})
    }else{
        res.send({item})
    }
})

router.delete("/:iid", async (req, res) => {
    const id = req.params.iid;

    // Verificar si el producto con el ID dado existe
    const existingItem = await manager.getItem(id);

    if (!existingItem) {
        res.status(404).send({ message: "Producto no encontrado" });
        return;
    }

    // Eliminar el producto
    const remainingItems = await manager.deleteItem(id);

    res.send({ status: "success", remainingItems });
});


router.put("/:iid", async (req, res) => {
    const id = req.params.iid;
    const updatedItem = req.body;

    // Verificar si el producto con el ID dado existe
    const existingItem = await manager.getItem(id);

    if (!existingItem) {
        res.status(404).send({ message: "Producto no encontrado" });
        return;
    }

    // Actualizar el producto
    const updatedItems = await manager.updateItem(id, updatedItem);

    res.send({ status: "success", updatedItems });
});


router.post("/", async (req, res) => {
    await manager.addItem(req.body);
    res.send({ status: "success" });
});

async function addProducts(){
    await manager.addItem({desripcion:"item 1"})
    await manager.addItem({desripcion:"item 2"})
    await manager.addItem({desripcion:"item 3"})
    await manager.addItem({desripcion:"item 4"})

}

addProducts()

module.exports = router;
