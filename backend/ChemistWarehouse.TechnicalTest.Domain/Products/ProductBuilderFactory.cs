using System;
using System.Collections.Generic;
using System.Text;

namespace ChemistWarehouse.TechnicalTest.Domain.Products
{
    public class ProductBuilderFactory : IProductBuilderFactory
    {
        public IProductBuilder CreateForNew()
        {
            return new ProductBuilder();
        }

        public IProductBuilder CreateForUpdate(Product existingProduct)
        {
            return new ProductBuilder(existingProduct);
        }
    }
}
