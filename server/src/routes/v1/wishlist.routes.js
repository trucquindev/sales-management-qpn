const express = require('express');
const {
  getAllWishlistController,
  postNewWishlostController,
} = require('../../controllers/wishlist.controller');

const router = express.Router();

router.get('/:userId', getAllWishlistController);
router.post('/create', postNewWishlostController);

export const wishlistRoute = router;
