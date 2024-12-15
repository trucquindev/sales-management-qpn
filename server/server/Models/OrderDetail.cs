using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class OrderDetail
    {
        [BsonId]
        [BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("product_id"), BsonRepresentation(BsonType.String)]
        public string? ProductID { get; set; }
        [BsonElement("order_id"), BsonRepresentation(BsonType.String)]
        public string? OrderID { get; set; }
    }
}
