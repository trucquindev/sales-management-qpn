using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IMongoCollection<Product>? _products;
        private readonly IMongoCollection<Review>? _review;
        private readonly IMongoCollection<Customer>? _customer;
        public ProductController(MongoDbService mongoDbService)
        {
            _products = mongoDbService.Database?.GetCollection<Product>("products");
            _review = mongoDbService.Database?.GetCollection<Review>("reviews");
            _customer = mongoDbService.Database?.GetCollection<Customer>("customers");
        }

        [HttpGet]
        public async Task<IEnumerable<Product>> Get()
        {
            return await _products.Find(FilterDefinition<Product>.Empty).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product?>> GetById(string id)
        {
            var filter = Builders<Product>.Filter.Eq(x => x.Id, id);
            var product = await _products.Find(filter).FirstOrDefaultAsync();
            if (product == null)
                return NotFound("Category not found");

            // Lấy danh sách reivew theo productid
            var reiviewFilter = Builders<Review>.Filter.Eq(x => x.ProductId, id);
            var reviews = await _review.Find(reiviewFilter).ToListAsync();

            // Lấy thông tin người dùng cho mỗi review
            var customerIds = reviews.Select(r => r.UserId).Distinct().ToList(); // Lấy danh sách userId không trùng lặp
            var customerFilter = Builders<Customer>.Filter.In(c => c.Id, customerIds);
            var customers = await _customer.Find(customerFilter).ToListAsync();

            // Ghép thông tin review và customer
            var reviewWithCustomer = reviews.Select(review =>
            {
                var customer = customers.FirstOrDefault(c => c.Id == review.UserId);
                return new
                {
                    id = review.Id,
                    title = review.Title,
                    star = review.Star,
                    description = review.Description,
                    customer = customer != null ? new
                    {
                        id = customer.Id,
                        name = customer.Name,
                        email = customer.Email
                    } : null // Nếu không tìm thấy customer, để null
                };
            });

            // Tạo kết quả kết hợp
            var result = new
            {
                product = new
                {
                    id = product.Id,
                    name = product.Name,
                    title = product.Title,
                    image = product.Image,
                    start = product.Start,
                    description = product.Description,
                    price = product.Price,
                    sku = product.SKU,
                    _Destroy = product._Destroy,
                    categoryId = product.CategoryId,
                    reviews = reviewWithCustomer
                }
            };

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> Create(Product product)
        {
            await _products.InsertOneAsync(product);
            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }

        [HttpPut]
        public async Task<ActionResult> Update(Product product)
        {
            var filter = Builders<Product>.Filter.Eq(x => x.Id, product.Id);
            //var update = Builders<Customer>.Update
            //    .Set(x => x.Name, customer.Name)
            //    .Set(x => x.Email, customer.Email);
            //await _customers.UpdateOneAsync(filter, update);

            await _products.ReplaceOneAsync(filter, product);
            return Ok();

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var filter = Builders<Product>.Filter.Eq(x => x.Id, id);
            await _products.DeleteOneAsync(filter);
            return Ok();
        }

    }
}
