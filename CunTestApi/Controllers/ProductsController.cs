using CunTestApi.Data;
using CunTestApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Data.SqlClient;


namespace CunTestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]

    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/products
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _context.Products
               .FromSqlRaw("EXEC GetProducts")
               .ToListAsync();

            if (products == null || products.Count == 0)
            {
                return Ok(new { response = 0, message = "No data found!" });
            }

            return Ok(new { response = products, message = "Data retrieved successfully!" });
        }

        // GET: api/products/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Products>> GetProduct(int id)
        {
            var product = _context.Products
                .FromSqlRaw("EXEC GetProductById @ProductId", new SqlParameter("@ProductId", id))
                .AsEnumerable()
                .FirstOrDefault();

            if (product == null)
            {
                return Ok(new { response = 0, message = "Product not found!" });
            }

            return Ok(new { response = product, message = "Product retrieved successfully!" });
        }

        // POST: api/products
        [HttpPost]
        public async Task<ActionResult<Products>> CreateProduct(Products product)
        {
             await _context.Database.ExecuteSqlRawAsync(
                "EXEC InsertProduct @ProductName, @ProductDescription, @ProductPrice, @ProductStock",
                new SqlParameter("@ProductName", product.ProductName),
                new SqlParameter("@ProductDescription", product.ProductDescription),
                new SqlParameter("@ProductPrice", product.ProductPrice),
                new SqlParameter("@ProductStock", product.ProductStock)
            );

            return Ok(new { response = 1, message = "Product created successfully!" });
        }

        // PUT: api/products/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Products product)
        {
            if (id != product.ProductsId)
            {
                return BadRequest(new { message = "Product ID mismatch!" });
            }

            var existingProduct = await _context.Products.FindAsync(id);
            if (existingProduct == null)
            {
                return Ok(new { response = 0, message = "Product not found!" });
            }

            await _context.Database.ExecuteSqlRawAsync(
                "EXEC UpdateProduct @ProductsId, @ProductName, @ProductDescription, @ProductPrice, @ProductStock",
                new SqlParameter("@ProductsId", product.ProductsId),
                new SqlParameter("@ProductName", product.ProductName),
                new SqlParameter("@ProductDescription", product.ProductDescription),
                new SqlParameter("@ProductPrice", product.ProductPrice),
                new SqlParameter("@ProductStock", product.ProductStock)
            );

            return Ok(new { response = 1, message = "Product updated successfully!" });
        }

        // DELETE: api/products/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
             var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return Ok(new { response = 0, message = "Product not found!" });
            }

            await _context.Database.ExecuteSqlRawAsync(
                "EXEC DeleteProduct @ProductsId",
                new SqlParameter("@ProductsId", id)
            );

            return Ok(new { response = 1, message = "Product deleted successfully!" });
        }

        // GET: api/products/stock/{id}
        [HttpGet("stock/{id}")]
        public async Task<ActionResult<int>> GetProductStock(int id)
        {
           var product = _context.Database
           .SqlQueryRaw<ProductStockDto>("EXEC GetProductById @ProductsId",
           new SqlParameter("@ProductsId", id))
           .AsEnumerable()
           .FirstOrDefault();

            if (product == null)
            {
                return Ok(new { response = 0, message = "Product not found!" });
            }

            return Ok(new { response = product.ProductStock, message = "Stock retrieved successfully!" });
        }
    }

}