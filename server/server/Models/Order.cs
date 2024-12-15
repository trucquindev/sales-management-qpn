using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Order
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("user_id"), BsonRepresentation(BsonType.String)]
        public string? UserID { get; set; }
        [BsonElement("time"), BsonRepresentation(BsonType.String)]
        public DateTime? Time { get; set; }
        [BsonElement("billing_id"), BsonRepresentation(BsonType.String)]
        public string? BillingID { get; set; }
    }
}
