using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace server.Models
{
    public class Review
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("title"), BsonRepresentation(BsonType.String)]
        public string? Title { get; set; }
        [BsonElement("star"), BsonRepresentation(BsonType.Int32)]
        public int? Star { get; set; }
        [BsonElement("description"), BsonRepresentation(BsonType.String)]
        public string? Description { get; set; }
        [BsonElement("userId"), BsonRepresentation(BsonType.ObjectId)]
        public string? UserId { get; set; }
        [BsonElement("productId"), BsonRepresentation(BsonType.ObjectId)]
        public string? ProductId { get; set; }
    }
}
