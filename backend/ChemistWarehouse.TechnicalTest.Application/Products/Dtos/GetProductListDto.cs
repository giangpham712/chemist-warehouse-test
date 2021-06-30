using ChemistWarehouse.TechnicalTest.Common;

namespace ChemistWarehouse.TechnicalTest.Application.Products.Dtos
{
    public class GetProductListDto
    {
        public GetProductListDto()
        {
            PageSize = 5;
        }

        public int StartIndex { get; set; }
        public int PageSize { get; set; }
        public string SortBy { get; set; }
        public SortDirection SortDir { get; set; }
    }
}
