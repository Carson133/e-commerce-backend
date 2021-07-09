const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: 
      {
        model: Product,
        through: ProductTag
      },
  })
  .then (dbTagData => {
    res.status(200).json({ dbTagData})
  })
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },

    include: 
      {
        model: Product,
        through: ProductTag
      },
  })
  .then (dbTagData => {
    res.status(200).json({ dbTagData})
  })
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then(dbTagData => {
    res.json(dbTagData);
  })
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then (dbTagData => {
    res.status(200).json({ dbTagData})
  })
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then (dbTagData => {
    res.status(200).json({ dbTagData})
  })
});

module.exports = router;
