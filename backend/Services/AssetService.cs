using MongoDB.Driver;
using Backend.Models;

namespace Backend.Services;

public class AssetService
{
    private readonly IMongoCollection<Asset> _collection;

    public AssetService(IMongoClient client, IConfiguration config)
    {
        var database = client.GetDatabase(config["Mongo:Database"]);
        _collection = database.GetCollection<Asset>("assets");

        var indexKeys = Builders<Asset>.IndexKeys.Ascending(a => a.SerialNumber);
        _collection.Indexes.CreateOne(
            new CreateIndexModel<Asset>(indexKeys, new CreateIndexOptions { Unique = true }));
    }

    public async Task<(List<Asset>, long)> GetAsync(int page, int pageSize, string? search)
    {
        var filter = string.IsNullOrWhiteSpace(search)
            ? Builders<Asset>.Filter.Empty
            : Builders<Asset>.Filter.Regex(a => a.SerialNumber,
                new MongoDB.Bson.BsonRegularExpression(search, "i"));

        var total = await _collection.CountDocumentsAsync(filter);

        var items = await _collection.Find(filter)
            .Skip((page - 1) * pageSize)
            .Limit(pageSize)
            .ToListAsync();

        return (items, total);
    }

    public Task<Asset?> GetByIdAsync(string id) =>
        _collection.Find(a => a.Id == id).FirstOrDefaultAsync();

    public Task CreateAsync(Asset asset)
    {
        asset.CreatedAt = DateTime.UtcNow;
        asset.UpdatedAt = DateTime.UtcNow;
        return _collection.InsertOneAsync(asset);
    }

    public Task UpdateAsync(string id, Asset asset)
    {
        asset.UpdatedAt = DateTime.UtcNow;
        return _collection.ReplaceOneAsync(a => a.Id == id, asset);
    }

    public Task DeleteAsync(string id) =>
        _collection.DeleteOneAsync(a => a.Id == id);
}