using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace server.Models
{
    public class Category
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("name"), BsonRepresentation(BsonType.String)]
        public string? Name { get; set; }
        [BsonElement("image"), BsonRepresentation(BsonType.String)]
        public string? Image { get; set; }
        //[BsonElement("Products"), BsonRepresentation(BsonType.Array)]
        //public ICollection<Product> Products { get; set; }
}
}
