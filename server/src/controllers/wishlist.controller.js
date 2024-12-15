const {
  getAllWishlistService,
  createNewService,
} = require('../services/wishlist.service');
const xml2js = require('xml2js');
// Hàm chuyển đổi XML thành JSON
const xmlToJson = (xml) => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

async function getAllWishlistController(req, res) {
  try {
    const { userId } = req.params;
    const data = await getAllWishlistService(userId);
    res.set('Content-Type', 'application/xml');
    res.status(200).json({ message: 'Get data categories thành công.', data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
async function postNewWishlostController(req, res) {
  try {
    // const { userId } = req.params;
    const jsonData = await xmlToJson(req.body);
    let initData = {
      productId: jsonData.item.productId[0],
      name: jsonData.item.name[0],
      price: parseFloat(jsonData.item.price[0]), // Chuyển sang double
      stockstt: jsonData.item.stockstt[0].toLowerCase() === 'true', // Chuyển sang boolean
      userId: jsonData.item.userId[0],
      image: jsonData.item.image[0],
      quantity: parseFloat(jsonData.item.quantity[0]), // Chuyển sang double
      unit: '1kg',
    };
    const data = await createNewService(initData);
    res.set('Content-Type', 'application/xml');
    res.status(200).json({ message: 'Insert wishlist thành công.', data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { getAllWishlistController, postNewWishlostController };
