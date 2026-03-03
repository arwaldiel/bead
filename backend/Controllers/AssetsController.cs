using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using Backend.Models;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AssetsController : ControllerBase
{
    private readonly AssetService _service;

    public AssetsController(AssetService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> Get(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null)
    {
        var (items, total) = await _service.GetAsync(page, pageSize, search);

        return Ok(new
        {
            items,
            page,
            pageSize,
            totalItems = total,
            totalPages = (int)Math.Ceiling(total / (double)pageSize)
        });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        var asset = await _service.GetByIdAsync(id);
        return asset is null ? NotFound() : Ok(asset);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Asset asset)
    {
        await _service.CreateAsync(asset);
        return CreatedAtAction(nameof(GetById), new { id = asset.Id }, asset);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, Asset asset)
    {
        await _service.UpdateAsync(id, asset);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        await _service.DeleteAsync(id);
        return NoContent();
    }
}