using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IMongoCollection<Category>? _categories;
        private readonly IMongoCollection<Product>? _products;
        public CategoryController(MongoDbService mongoDbService)
        {
            _categories = mongoDbService.Database?.GetCollection<Category>("categories");
            _products = mongoDbService.Database?.GetCollection<Product>("products");
        }

        [HttpGet]
        public async Task<IEnumerable<Category>> Get()
        {
            return await _categories.Find(FilterDefinition<Category>.Empty).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(string id)
        {
            var filter = Builders<Category>.Filter.Eq(x => x.Id, id);
            var category = await _categories.Find(filter).FirstOrDefaultAsync();
            if (category == null)
                return NotFound("Category not found");

            // Lấy danh sách Products theo CategoryId
            var productFilter = Builders<Product>.Filter.Eq(x => x.CategoryId, id);
            var products = await _products.Find(productFilter).ToListAsync();

            // Tạo kết quả kết hợp
            var result = new
            {
                category = new
                {
                    id = category.Id,
                    name = category.Name,
                    image = category.Image,
                    products = products.Select(product => new
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
                        categoryId = product.CategoryId
                    })
                }
            };

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<Category>> Create(Category category)
        {
            await _categories.InsertOneAsync(category);
            return CreatedAtAction(nameof(GetById), new { id = category.Id }, category);
        }

        [HttpPut]
        public async Task<ActionResult> Update(Category category)
        {
            var filter = Builders<Category>.Filter.Eq(x => x.Id, category.Id);
            //var update = Builders<Customer>.Update
            //    .Set(x => x.Name, customer.Name)
            //    .Set(x => x.Email, customer.Email);
            //await _customers.UpdateOneAsync(filter, update);

            await _categories.ReplaceOneAsync(filter, category);
            return Ok();

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var filter = Builders<Category>.Filter.Eq(x => x.Id, id);
            await _categories.DeleteOneAsync(filter);
            return Ok();
        }

    }
}
