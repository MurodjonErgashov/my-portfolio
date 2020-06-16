const router = require("express").Router();
const auth = require("../middleware/auth");

const Item = require("../modals/item");

router.get("/", async (req, res) => {
  await Item.find()
    .sort({ data: -1 })
    .then((items) => res.json(items));
});

router.post("/", auth, async (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  await newItem.save().then((item) => res.json(item));
});

router.delete("/:id", auth, async (req, res) => {
  await Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
