var express = require('express');
var router = express.Router();

const items = [
  { id: 1, name: 'Laptop', stock: 10 },
  { id: 2, names: 'Mouse', stock: 50 }
];

router.get('/', (req, res) => {
  res.status(200).json(items);
});

router.get('/empty/list', (req, res) => {
  res.status(200).json([]);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const item = items.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  res.status(200).json(item);
});

module.exports = router;