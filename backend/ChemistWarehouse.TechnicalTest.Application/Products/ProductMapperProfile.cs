using AutoMapper;
using ChemistWarehouse.TechnicalTest.Application.Products.Dtos;
using ChemistWarehouse.TechnicalTest.Domain.Products;

namespace ChemistWarehouse.TechnicalTest.Application.Products
{
    public class ProductMapperProfile : Profile
    {
        public ProductMapperProfile()
        {
            CreateMap<Product, ProductDto>();
        }
    }
}
