using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IMongoCollection<Review>? _reviews;
        public ReviewController(MongoDbService mongoDbService)
        {
            _reviews = mongoDbService.Database?.GetCollection<Review>("reviews");
        }

        [HttpGet]
        public async Task<IEnumerable<Review>> Get()
        {
            return await _reviews.Find(FilterDefinition<Review>.Empty).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Review?>> GetById(string id)
        {
            var filter = Builders<Review>.Filter.Eq(x => x.Id, id);
            var review = await _reviews.Find(filter).FirstOrDefaultAsync();
            return review is not null ? Ok(review) : NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<Review>> Create(Review review)
        {
            await _reviews.InsertOneAsync(review);
            return CreatedAtAction(nameof(GetById), new { id = review.Id }, review);
        }

        [HttpPut]
        public async Task<ActionResult> Update(Review review)
        {
            var filter = Builders<Review>.Filter.Eq(x => x.Id, review.Id);
            //var update = Builders<Customer>.Update
            //    .Set(x => x.Name, customer.Name)
            //    .Set(x => x.Email, customer.Email);
            //await _customers.UpdateOneAsync(filter, update);

            await _reviews.ReplaceOneAsync(filter, review);
            return Ok();

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var filter = Builders<Review>.Filter.Eq(x => x.Id, id);
            await _reviews.DeleteOneAsync(filter);
            return Ok();
        }

    }
}
