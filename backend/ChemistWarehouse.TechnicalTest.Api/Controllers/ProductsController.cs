using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChemistWarehouse.TechnicalTest.Application;
using ChemistWarehouse.TechnicalTest.Application.Products;
using ChemistWarehouse.TechnicalTest.Application.Products.Dtos;
using ChemistWarehouse.TechnicalTest.Common;

namespace ChemistWarehouse.TechnicalTest.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("")]
        public async Task<PagedResult<ProductDto>> GetListAsync(
            [FromQuery] GetProductListDto input)
        {
            var pagedProduct = await _productService.GetProductListAsync(input);
            return pagedProduct;
        }

        [HttpGet("{id}")]
        public async Task<ProductDto> GetAsync(
            [FromRoute] int id)
        {
            var product = await _productService.GetProductAsync(id);
            return product;
        }

        [HttpPost("")]
        public async Task<ProductDto> CreateAsync([FromBody] ProductDto input)
        {
            var createdProduct = await _productService.CreateProductAsync(input);
            return createdProduct;
        }

        [HttpPut("{id}")]
        public async Task<ProductDto> UpdateAsync([FromRoute] int id, [FromBody] ProductDto input)
        {
            var createdProduct = await _productService.UpdateProductAsync(id, input);
            return createdProduct;
        }

        [HttpDelete("{id}")]
        public async Task DeleteAsync([FromRoute] int id)
        {
            await _productService.DeleteProductAsync(id);
        }
    }
}
