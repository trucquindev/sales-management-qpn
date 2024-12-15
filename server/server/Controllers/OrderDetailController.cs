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
    public class OrderDetailController : ControllerBase
    {
        private readonly IMongoCollection<OrderDetail>? _orderdetail;
        public OrderDetailController(MongoDbService mongoDbService)
        {
            _orderdetail = mongoDbService.Database?.GetCollection<OrderDetail>("orderdetail");
        }

        [HttpGet]
        public async Task<IEnumerable<OrderDetail>> Get()
        {
            return await _orderdetail.Find(FilterDefinition<OrderDetail>.Empty).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDetail?>> GetById(string id)
        {
            var filter = Builders<OrderDetail>.Filter.Eq(x => x.Id, id);
            var orderdetail = await _orderdetail.Find(filter).FirstOrDefaultAsync();
            return orderdetail is not null ? Ok(orderdetail) : NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<OrderDetail>> Create(OrderDetail orderdetail)
        {
            await _orderdetail.InsertOneAsync(orderdetail);
            return CreatedAtAction(nameof(GetById), new { id = orderdetail.Id }, orderdetail);
        }

        [HttpPut]
        public async Task<ActionResult> Update(OrderDetail orderdetail)
        {
            var filter = Builders<OrderDetail>.Filter.Eq(x => x.Id, orderdetail.Id);
            //var update = Builders<OrderDetail>.Update
            //    .Set(x => x.ProductID, order.ProductID)
            //    .Set(x => x.OrderID, order.OrderID);
            //await _orderdt.UpdateOneAsync(filter, update);

            await _orderdetail.ReplaceOneAsync(filter, orderdetail);
            return Ok();

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var filter = Builders<OrderDetail>.Filter.Eq(x => x.Id, id);
            await _orderdetail.DeleteOneAsync(filter);
            return Ok();
        }

    }
}
