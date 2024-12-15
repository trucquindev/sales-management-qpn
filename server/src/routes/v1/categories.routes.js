const express = require('express');
const {
  getAllCategoryController,
} = require('../../controllers/categories.controller');

const router = express.Router();

router.get('/', getAllCategoryController);

export const categoryRoute = router;
