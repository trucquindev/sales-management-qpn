using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace server.Models
{
    public class Product
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("name"), BsonRepresentation(BsonType.String)]
        public string? Name { get; set; }
        [BsonElement("title"), BsonRepresentation(BsonType.String)]
        public string? Title { get; set; }
        [BsonElement("image")]
        public List<string>? Image { get; set; }
        [BsonElement("star"), BsonRepresentation(BsonType.Int32)]
        public int? Start { get; set; }
        [BsonElement("description"), BsonRepresentation(BsonType.String)]
        public string? Description { get; set; }
        [BsonElement("price"), BsonRepresentation(BsonType.Double)]
        public double? Price { get; set; }
        [BsonElement("SKU"), BsonRepresentation(BsonType.Int32)]
        public int? SKU { get; set; }
        [BsonElement("_destroy"), BsonRepresentation(BsonType.Boolean)]
        public bool? _Destroy { get; set; }
        [BsonElement("categoryId"), BsonRepresentation(BsonType.ObjectId)]
        public string? CategoryId { get; set; }
        public object IdAdditionInfor { get; internal set; }
    }
}
