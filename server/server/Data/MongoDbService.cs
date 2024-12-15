using MongoDB.Driver;

namespace server.Data
{
    public class MongoDbService
    {
        private readonly IConfiguration _configuration;
        private readonly IMongoDatabase? _database;

        public MongoDbService(IConfiguration configuration)
        {
            _configuration = configuration;

            var connectionString = _configuration.GetConnectionString("DbConnection");
            var mongoUrl = MongoUrl.Create(connectionString);
            var mongoClient = new MongoClient(mongoUrl);
            var databaseName = "projectHNP2Q";
            _database = mongoClient.GetDatabase(databaseName);
        }

        public IMongoDatabase? Database => _database;
    }
}
