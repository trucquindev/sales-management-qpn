const xml2js = require('xml2js');
import convert from 'xml-js';
import { shoppingCartService } from '../services/shoppingCart.service';

// Hàm xử lý dữ liệu XML khi nhận từ client và chuyển nó thành JSON
const parseXMLToJSON = (xml) => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, { explicitArray: false }, (err, result) => {
      if (err) {
        reject('Failed to parse XML');
      } else {
        resolve(result);
      }
    });
  });
};

// Controller cho POST thêm sản phẩm vào giỏ hàng
const addShoppingCartItem = async (req, res) => {
  const xmlData = await req.body;

  try {
    const jsonData = await parseXMLToJSON(xmlData); // Chuyển XML thành JSON

    const { customer_id, product_id, quantity } = jsonData.shoppingCart;

    await shoppingCartService.createShoppingCart(
      customer_id,
      product_id,
      quantity
    );

    res.status(201).send('Product added to shopping cart');
  } catch (err) {
    res.status(500).send('Error adding product to cart');
  }
};

// Controller cho GET tất cả giỏ hàng
const getAllShoppingCarts = async (req, res) => {
  try {
    const { userId } = req.params;
    const carts = await shoppingCartService.getAllShoppingCarts(userId);
    const options = { compact: true, ignoreComment: true, spaces: 4 };
    const wrappedData = { list: { shoppingCarts: carts } };
    const data = convert.json2xml(wrappedData, options);

    res.set('Content-Type', 'application/xml');
    res.status(200).json({ message: 'Get data categories thành công.', data });
  } catch (err) {
    res.status(500).send('Error fetching shopping carts');
  }
};

// Controller cho DELETE xóa sản phẩm khỏi giỏ hàng
const deleteShoppingCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    await shoppingCartService.removeShoppingCartItem(id);
    res.send('Product removed from shopping cart');
  } catch (err) {
    res.status(500).send('Error removing product from cart');
  }
};

export const shoppingCartController = {
  getAllShoppingCarts,
  addShoppingCartItem,
  deleteShoppingCartItem,
};
