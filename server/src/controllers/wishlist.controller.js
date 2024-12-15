const { getAllWishlistService } = require('../services/wishlist.service');

async function getAllWishlistController(req, res) {
  try {
    const { userId } = req.params;
    console.log('🚀 ~ getAllWishlistController ~ userId:', userId);
    const data = await getAllWishlistService(userId);
    res.set('Content-Type', 'application/xml');
    res.status(200).json({ message: 'Get data categories thành công.', data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { getAllWishlistController };
