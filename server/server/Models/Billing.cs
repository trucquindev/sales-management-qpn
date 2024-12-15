using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace server.Models
{
    public class Billing
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("customer_name"), BsonRepresentation(BsonType.String)]
        public string? Name { get; set; }
        [BsonElement("address"), BsonRepresentation(BsonType.String)]
        public string? Address { get; set; }
        [BsonElement("zip_code"), BsonRepresentation(BsonType.String)]
        public string? ZipCode { get; set; }
        [BsonElement("email"), BsonRepresentation(BsonType.String)]
        public string? Email { get; set; }
        [BsonElement("phone"), BsonRepresentation(BsonType.String)]
        public string? PhoneNumber { get; set; }
        [BsonElement("note"), BsonRepresentation(BsonType.String)]
        public string? Note { get; set; }
        [BsonElement("payment_menthod"), BsonRepresentation(BsonType.String)]
        public string? PaymentMenthod { get; set; }
        [BsonElement("id_order"), BsonRepresentation(BsonType.String)]
        public string? Id_Order { get; set; }
    }
}
