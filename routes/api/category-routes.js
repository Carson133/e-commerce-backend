const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', ]
    }
  })
  .then(dbCatData => {
    if (!dbCatData) {
      res.status(404).json({ message: 'No categories found' });
      return;
    }
    res.json(dbCatData);
  })
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  .then(dbCatData => {
    if (!dbCatData) {
      res.status(404).json({ message: 'No categories found' });
      return;
    }
    res.json(dbCatData);
  })
});

router.post('/', (req, res) => {
  Category.create(req.body)
    .then(dbCatData => {
      res.json(dbCatData);
    })
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbCatData => {
    res.json(dbCatData);
  })
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCatData => {
    res.json(dbCatData);
  })
});

module.exports = router;
