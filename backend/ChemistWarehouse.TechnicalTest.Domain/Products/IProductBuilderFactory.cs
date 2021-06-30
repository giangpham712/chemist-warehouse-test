namespace ChemistWarehouse.TechnicalTest.Domain.Products
{
    public interface IProductBuilderFactory
    {
        IProductBuilder CreateForNew();
        IProductBuilder CreateForUpdate(Product existingProduct);
    }
}