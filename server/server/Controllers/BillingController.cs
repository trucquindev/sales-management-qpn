using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillingController : ControllerBase
    {
        private readonly IMongoCollection<Billing>? _billing;
        public BillingController(MongoDbService mongoDbService)
        {
            _billing = mongoDbService.Database?.GetCollection<Billing>("billing");
        }

        [HttpGet]
        public async Task<IEnumerable<Billing>> Get()
        {
            return await _billing.Find(FilterDefinition<Billing>.Empty).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Billing?>> GetById(string id)
        {
            var filter = Builders<Billing>.Filter.Eq(x => x.Id, id);
            var billing = await _billing.Find(filter).FirstOrDefaultAsync();
            return billing is not null ? Ok(billing) : NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<Billing>> Create(Billing billing)
        {
            await _billing.InsertOneAsync(billing);
            return CreatedAtAction(nameof(GetById), new { id = billing.Id }, billing);
        }

        [HttpPut]
        public async Task<ActionResult> Update(Billing billing)
        {
            var filter = Builders<Billing>.Filter.Eq(x => x.Id, billing.Id);
            //var update = Builders<Customer>.Update
            //    .Set(x => x.Name, customer.Name)
            //    .Set(x => x.Email, customer.Email);
            //await _customers.UpdateOneAsync(filter, update);

            await _billing.ReplaceOneAsync(filter, billing);
            return Ok();

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var filter = Builders<Billing>.Filter.Eq(x => x.Id, id);
            await _billing.DeleteOneAsync(filter);
            return Ok();
        }
    }
}
