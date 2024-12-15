using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using server.Data;
using server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController: ControllerBase
    {
        private readonly IMongoCollection<Order>? _order;
        public OrderController(MongoDbService mongoDbService)
        {
            _order = mongoDbService.Database?.GetCollection<Order>("order");
        }

        [HttpGet]
        public async Task<IEnumerable<Order>> Get()
        {
            return await _order.Find(FilterDefinition<Order>.Empty).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order?>> GetById(string id)
        {
            var filter = Builders<Order>.Filter.Eq(x => x.Id, id);
            var order = await _order.Find(filter).FirstOrDefaultAsync();
            return order is not null ? Ok(order) : NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<Order>> Create(Order order)
        {
            await _order.InsertOneAsync(order);
            return CreatedAtAction(nameof(GetById), new { id = order.Id }, order);
        }

        [HttpPut]
        public async Task<ActionResult> Update(Order order)
        {
            var filter = Builders<Order>.Filter.Eq(x => x.Id, order.Id);
            //var update = Builders<Order>.Update
            //    .Set(x => x.UserID, order.UserID)
            //    .Set(x => x.BillingID, order.BillingID);
            //await _order.UpdateOneAsync(filter, update);

            await _order.ReplaceOneAsync(filter, order);
            return Ok();

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var filter = Builders<Order>.Filter.Eq(x => x.Id, id);
            await _order.DeleteOneAsync(filter);
            return Ok();
        }

    }
}
