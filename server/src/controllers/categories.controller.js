const { getAllCategoryService } = require('../services/categories.service');

async function getAllCategoryController(req, res) {
  try {
    const data = await getAllCategoryService(req.body);
    res.set('Content-Type', 'application/xml');
    res.status(200).json({ message: 'Get data categories thành công.', data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { getAllCategoryController };
