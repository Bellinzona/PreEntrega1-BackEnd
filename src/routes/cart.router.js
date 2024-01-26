const { Router } = require("express");
const carritoManager = require("../carritoManager");

const router = Router();

const manager = new carritoManager(__dirname + "/../files/carts.json");

router.get("/", async (req, res) => {
    let items = await manager.getItems();

    console.log(items)

    const { limit } = req.query;
    if (limit) {
        items = items.slice(0, limit);
    }

    res.send({ carritos: items });
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

router.post("/:cid/product/:iid", async (req, res) => {
    await manager.addProductinCarrito(req.params.cid, req.params.iid);
    res.send({ status: "success" });
});


router.post("/", async (req, res) => {
    await manager.addItem(req.body);
    res.send({ status: "success" });
});

module.exports = router;
