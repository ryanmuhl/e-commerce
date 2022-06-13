const router = require('express').Router();
const { Category, Product } = require('../../models');


// The `/api/categories` endpoint
// find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
  Category.findAll(
    {
      include: {
        model: Product,

      }
    }

  )
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// The `/api/categories/id` endpoint
// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
      },

    ]
  }).then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(dbCategoryData);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a new category
// The `/api/categories` endpoint
router.post('/', async (req, res) => {
  Category.create({
    category_name: req.body.category_name,

  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(dbCategoryData => {
      if (!dbCategoryData[0]) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  Category.destroy({

    where: {
      id: req.params.id
    },

  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;