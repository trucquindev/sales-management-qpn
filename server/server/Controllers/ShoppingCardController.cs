using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingCardController : ControllerBase
    {
        private readonly IMongoCollection<ShoppingCard>? _shoppingCard;
        private readonly IMongoCollection<Customer>? _customer;
        private readonly IMongoCollection<Product>? _products;
        public ShoppingCardController(MongoDbService mongoDbService)
        {
            _shoppingCard = mongoDbService.Database?.GetCollection<ShoppingCard>("shopping_card");
            _customer = mongoDbService.Database?.GetCollection<Customer>("customers");
            _products = mongoDbService.Database?.GetCollection<Product>("products");
        }

        [HttpGet]
        public async Task<IEnumerable<ShoppingCard>> Get()
        {
            return await _shoppingCard.Find(FilterDefinition<ShoppingCard>.Empty).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ShoppingCard?>> GetById(string id)
        {
            var filter = Builders<ShoppingCard>.Filter.Eq(x => x.Id, id);
            var shoppingCard = await _shoppingCard.Find(filter).FirstOrDefaultAsync();
            return shoppingCard is not null ? Ok(shoppingCard) : NotFound();

        }
        [HttpGet("customer/{customerId}")]
        public async Task<ActionResult> GetByCustomerId(string customerId)
        {
            if (string.IsNullOrEmpty(customerId))
            {
                return BadRequest("CustomerId is required.");
            }

            try
            {
                // Lọc ShoppingCards theo customerId
                var shoppingCards = await _shoppingCard
                    .Find(card => card.CustomerId == customerId)
                    .ToListAsync();

                if (shoppingCards == null || !shoppingCards.Any())
                {
                    return NotFound($"No shopping cards found for customerId: {customerId}");
                }

                // Lấy danh sách ProductId từ các ShoppingCard
                var productIds = shoppingCards.Select(s => s.ProductId).Distinct().ToList();

                if (productIds == null || !productIds.Any())
                {
                    return NotFound("No product IDs found in the shopping cards.");
                }

                // Truy vấn tất cả sản phẩm tương ứng với danh sách ProductId
                var products = await _products
                    .Find(p => productIds.Contains(p.Id))
                    .ToListAsync();

                if (products == null || !products.Any())
                {
                    return NotFound("No products found in the database.");
                }

                // Kết hợp ShoppingCards với thông tin Product
                var result = shoppingCards.Select(card => new
                {
                    card.Id,
                    card.ProductId,
                    card.Quantity,
                    card.CustomerId,
                    Product = products.FirstOrDefault(p => p.Id == card.ProductId)
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu có
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPost]
        public async Task<ActionResult<ShoppingCard>> Create(ShoppingCard shoppingCard)
        {
            var filter = Builders<ShoppingCard>.Filter.And(Builders<ShoppingCard>.Filter.Eq(o => o.CustomerId, shoppingCard.CustomerId),
            Builders<ShoppingCard>.Filter.Eq(o => o.ProductId, shoppingCard.ProductId));

            var existingShoppingCard = await _shoppingCard.Find(filter).FirstOrDefaultAsync();


            if (existingShoppingCard != null)
            {
                // Cập nhật số lượng
                var update = Builders<ShoppingCard>.Update.Inc(o => o.Quantity, 1);
                await _shoppingCard.UpdateOneAsync(filter, update);
            }
            else
            {
                // Tạo đơn hàng mới
                var newShoppingCard = new ShoppingCard
                {
                    CustomerId = shoppingCard.CustomerId,
                    ProductId = shoppingCard.ProductId,
                    Quantity = 1
                };

                await _shoppingCard.InsertOneAsync(newShoppingCard);
            }

            return Ok("Order processed successfully");
        }

        [HttpPut]
        public async Task<ActionResult> Update(ShoppingCard shoppingCard)
        {
            var filter = Builders<ShoppingCard>.Filter.Eq(x => x.Id, shoppingCard.Id);
            //var update = Builders<Customer>.Update
            //    .Set(x => x.Name, customer.Name)
            //    .Set(x => x.Email, customer.Email);
            //await _customers.UpdateOneAsync(filter, update);

            await _shoppingCard.ReplaceOneAsync(filter, shoppingCard);
            return Ok();

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var filter = Builders<ShoppingCard>.Filter.Eq(x => x.Id, id);
            await _shoppingCard.DeleteOneAsync(filter);
            return Ok();
        }

    }
}
