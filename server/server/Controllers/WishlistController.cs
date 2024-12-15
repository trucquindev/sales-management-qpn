using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlistController : ControllerBase
    {
        private readonly IMongoCollection<Wishlist>? _wishlists;
        public WishlistController(MongoDbService mongoDbService)
        {
            _wishlists = mongoDbService.Database?.GetCollection<Wishlist>("wishlists");
        }

        [HttpGet]
        public async Task<IEnumerable<Wishlist>> Get()
        {
            return await _wishlists.Find(FilterDefinition<Wishlist>.Empty).ToListAsync();
        }
        [HttpGet("byuser/{userId}")]
        public async Task<IEnumerable<Wishlist>> GetWishlistByUserId(string userId)
        {
            // Tạo bộ lọc để tìm kiếm theo UserId
            var filter = Builders<Wishlist>.Filter.Eq(x => x.UserId, userId);
            return await _wishlists.Find(filter).ToListAsync();

            // Trả về danh sách hoặc 404 nếu không tìm thấy
            //if (wishlists.Count == 0)
            //{
            //    return NotFound("No wishlist found for the given userId.");
            //}

            //return Ok(wishlists);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Wishlist?>> GetById(string id)
        {
            var filter = Builders<Wishlist>.Filter.Eq(x => x.Id, id);
            var wishlist = await _wishlists.Find(filter).FirstOrDefaultAsync();
            return wishlist is not null ? Ok(wishlist) : NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<Wishlist>> Create(Wishlist wishlist)
        {
            await _wishlists.InsertOneAsync(wishlist);
            return CreatedAtAction(nameof(GetById), new { id = wishlist.Id }, wishlist);
        }

        [HttpPut]
        public async Task<ActionResult> Update(Wishlist wishlists)
        {
            var filter = Builders<Wishlist>.Filter.Eq(x => x.Id, wishlists.Id);
            var update = Builders<Wishlist>.Update
                .Set(x => x.Name, wishlists.Name);
            await _wishlists.UpdateOneAsync(filter, update);

            await _wishlists.ReplaceOneAsync(filter, wishlists);
            return Ok();

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var filter = Builders<Wishlist>.Filter.Eq(x => x.UserId, id);
            await _wishlists.DeleteOneAsync(filter);
            return Ok();
        }

    }
}