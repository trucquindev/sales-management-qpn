using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using server.Data;
using server.Models;
using BCrypt.Net;
using Microsoft.AspNetCore.Identity.Data;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly IMongoCollection<Customer>? _customers;
        public CustomerController(MongoDbService mongoDbService)
        {
            _customers = mongoDbService.Database?.GetCollection<Customer>("customers");
        }

        [HttpGet]
        public async Task<IEnumerable<Customer>> Get()
        {
            return await _customers.Find(FilterDefinition<Customer>.Empty).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Customer?>> GetById(string id)
        {
            var filter = Builders<Customer>.Filter.Eq(x => x.Id, id);
            var customer = await _customers.Find(filter).FirstOrDefaultAsync();
            return customer is not null ? Ok(customer) : NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<Customer>> Create(Customer customer)
        {
            if (!string.IsNullOrEmpty(customer.Password))
            {
                customer.Password = BCrypt.Net.BCrypt.EnhancedHashPassword(customer.Password, 13);
            }

            await _customers.InsertOneAsync(customer);
            return CreatedAtAction(nameof(GetById), new { id = customer.Id }, customer);
        }

        [HttpPut]
        public async Task<ActionResult> Update(Customer customer)
        {
            var filter = Builders<Customer>.Filter.Eq(x => x.Id, customer.Id);

            if (!string.IsNullOrEmpty(customer.Password))
            {
                customer.Password = BCrypt.Net.BCrypt.EnhancedHashPassword(customer.Password, 13);
            }

            await _customers.ReplaceOneAsync(filter, customer);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var filter = Builders<Customer>.Filter.Eq(x => x.Id, id);
            await _customers.DeleteOneAsync(filter);
            return Ok();
        }

        [HttpPost("login")]
        public async Task<ActionResult<Customer>> Login([FromBody] LoginRequest loginRequest)
        {
            var filter = Builders<Customer>.Filter.Eq(x => x.Email, loginRequest.Email);
            var customer = await _customers.Find(filter).FirstOrDefaultAsync();

            if (customer == null)
            {
                return Unauthorized("User not found");
            }
            Console.WriteLine(customer.Password);
            bool isPasswordValid = BCrypt.Net.BCrypt.EnhancedVerify(loginRequest.Password, customer.Password);
            if (!isPasswordValid)
            {
                return Unauthorized("Invalid password");
            }

            return customer;
        }
    }
}