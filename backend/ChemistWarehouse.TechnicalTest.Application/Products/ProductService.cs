using System;
using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;
using AutoMapper;
using ChemistWarehouse.TechnicalTest.Application.Exceptions;
using ChemistWarehouse.TechnicalTest.Application.Products.Dtos;
using ChemistWarehouse.TechnicalTest.Common;
using ChemistWarehouse.TechnicalTest.Domain.Products;
using GetProductListDto = ChemistWarehouse.TechnicalTest.Application.Products.Dtos.GetProductListDto;

namespace ChemistWarehouse.TechnicalTest.Application.Products
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductService(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<PagedResult<ProductDto>> GetProductListAsync(GetProductListDto input)
        {
            var sortByProperty = typeof(Product).GetProperty(input.SortBy, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
            var sortBy = sortByProperty == null ? nameof(Product.Name) : sortByProperty.Name;

            var products = await _productRepository.GetListAsync(
                input.StartIndex, 
                input.PageSize,
                sortBy, 
                input.SortDir);

            var productCount = await _productRepository.GetCountAsync();

            return new PagedResult<ProductDto>()
            {
                Items = _mapper.Map<List<Product>, List<ProductDto>>(products),
                TotalCount = productCount
            };
        }

        public async Task<ProductDto> GetProductAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
            {
                throw new EntityNotFoundException(nameof(Product), id);
            }

            return _mapper.Map<Product, ProductDto>(product);
        }

        public async Task<ProductDto> CreateProductAsync(ProductDto input)
        {
            var productBuilder = new ProductBuilder()
                .WithName(input.Name)
                .WithPrice(input.Price)
                .WithStatus(input.Active)
                .WithType(input.Type);

            var product = productBuilder.Build();

            var inserted = await _productRepository.InsertAsync(product);

            return _mapper.Map<Product, ProductDto>(inserted);
        }

        public async Task<ProductDto> UpdateProductAsync(int id, ProductDto input)
        {
            var existingProduct = await _productRepository.GetByIdAsync(id);
            if (existingProduct == null)
            {
                throw new EntityNotFoundException(nameof(Product), id);
            }

            var productBuilder = new ProductBuilder(existingProduct)
                .WithName(input.Name)
                .WithPrice(input.Price)
                .WithStatus(input.Active)
                .WithType(input.Type);

            var product = productBuilder.Build();

            var updated = await _productRepository.UpdateAsync(product);

            return _mapper.Map<Product, ProductDto>(updated);
        }

        public async Task DeleteProductAsync(int id)
        {
            var existingProduct = await _productRepository.GetByIdAsync(id);
            if (existingProduct == null)
            {
                throw new EntityNotFoundException(nameof(Product), id);
            }

            await _productRepository.DeleteAsync(existingProduct);
        }
    }
}
