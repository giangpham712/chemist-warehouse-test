namespace ChemistWarehouse.TechnicalTest.Application.Products.Dtos
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Type { get; set; }
        public bool Active { get; set; }
    }
}
