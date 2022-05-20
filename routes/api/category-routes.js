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
        attributes: ['product_name'],
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
        attributes: ['category_id']
      },

    ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
      }
      res.json(dbUserData);
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;