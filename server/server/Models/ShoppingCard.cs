using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace server.Models
{
    public class ShoppingCard
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("product_id"), BsonRepresentation(BsonType.String)]
        public string? ProductId { get; set; }
        [BsonElement("quantity"), BsonRepresentation(BsonType.Int32)]
        public Int32? Quantity { get; set; }
        [BsonElement("customer_id"), BsonRepresentation(BsonType.ObjectId)]
        public string? CustomerId { get; set; }
    }
}