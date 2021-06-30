using System.Threading.Tasks;
using ChemistWarehouse.TechnicalTest.Application.Products.Dtos;
using ChemistWarehouse.TechnicalTest.Common;
using GetProductListDto = ChemistWarehouse.TechnicalTest.Application.Products.Dtos.GetProductListDto;

namespace ChemistWarehouse.TechnicalTest.Application.Products
{
    public interface IProductService
    {
        Task<PagedResult<ProductDto>> GetProductListAsync(GetProductListDto input);
        Task<ProductDto> GetProductAsync(int id);
        Task<ProductDto> CreateProductAsync(ProductDto input);
        Task<ProductDto> UpdateProductAsync(int id, ProductDto input);
        Task DeleteProductAsync(int id);
    }
}