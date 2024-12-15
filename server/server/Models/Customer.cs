using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace server.Models
{
    public class Customer
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("customer_name"), BsonRepresentation(BsonType.String)]
        public string? Name { get; set; }
        [BsonElement("customer_email"), BsonRepresentation(BsonType.String)]
        public string? Email { get; set; }
        [BsonElement("customer_password"), BsonRepresentation(BsonType.String)]
        public string? Password { get; set; }
        [BsonElement("customer_phone"), BsonRepresentation(BsonType.String)]
        public string? Phone { get; set; }
        [BsonElement("customer_address"), BsonRepresentation(BsonType.String)]
        public string? Address { get; set; }
    }
}