const express = require('express');
const {
  getAllWishlistController,
} = require('../../controllers/wishlist.controller');

const router = express.Router();

router.get('/:userId', getAllWishlistController);

export const wishlistRoute = router;
