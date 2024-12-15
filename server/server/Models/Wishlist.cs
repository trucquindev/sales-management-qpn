using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace server.Models
{
    public class Wishlist
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("name"), BsonRepresentation(BsonType.String)]
        public string? Name { get; set; }

        [BsonElement("price"), BsonRepresentation(BsonType.Double)]
        public decimal? Price { get; set; }
        [BsonElement("image"), BsonRepresentation(BsonType.String)]
        public string? Image { get; set; }

        [BsonElement("stockstt"), BsonRepresentation(BsonType.Boolean)]
        public Boolean StockStatus { get; set; }
        [BsonElement("quantity"), BsonRepresentation(BsonType.Double)]
        public double? Quantity { get; set; }

        [BsonElement("userId"), BsonRepresentation(BsonType.ObjectId)]
        public string? UserId { get; set; }
        [BsonElement("productId"), BsonRepresentation(BsonType.ObjectId)]
        public string? productId { get; set; }
        [BsonElement("unit"), BsonRepresentation(BsonType.String)]
        public string? Unit { get; set; }
    }
}