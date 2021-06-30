using System;
using System.Collections.Generic;
using System.Text;
using ChemistWarehouse.TechnicalTest.Domain.Products;

namespace ChemistWarehouse.TechnicalTest.EntityFramework.Repositories
{
    public class EfProductRepository : EfRepositoryBase<Product>, IProductRepository
    {
        public EfProductRepository(ChemistWarehouseDbContext context) : base(context)
        {
        }
    }
}
