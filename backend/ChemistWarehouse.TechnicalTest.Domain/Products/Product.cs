using ChemistWarehouse.TechnicalTest.Domain.Abstraction;

namespace ChemistWarehouse.TechnicalTest.Domain.Products
{
    public class Product : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Type { get; set; }
        public bool Active { get; set; }
    }
}
