const express = require('express');
const {
  getAllWishlistController,
  postNewWishlostController,
  deleteWishlistController,
} = require('../../controllers/wishlist.controller');

const router = express.Router();

router.get('/:userId', getAllWishlistController);
router.post('/create', postNewWishlostController);
router.delete('/delete', deleteWishlistController);

export const wishlistRoute = router;
