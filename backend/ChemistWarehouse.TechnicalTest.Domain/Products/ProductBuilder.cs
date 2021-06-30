using System;
using System.Collections.Generic;
using System.Text;

namespace ChemistWarehouse.TechnicalTest.Domain.Products
{
    public class ProductBuilder : IProductBuilder
    {
        private readonly Product _product;

        public ProductBuilder()
        {
            _product = new Product();
        }

        public ProductBuilder(Product product)
        {
            _product = product;
        }

        public ProductBuilder WithName(string name)
        {
            _product.Name = name;
            return this;
        }

        public ProductBuilder WithPrice(decimal price)
        {
            _product.Price = price;
            return this;
        }

        public ProductBuilder WithType(string type)
        {
            _product.Type = type;
            return this;
        }

        public ProductBuilder WithStatus(bool active)
        {
            _product.Active = active;
            return this;
        }

        public Product Build()
        {
            return this._product;
        }
    }

    public interface IProductBuilder
    {
        Product Build();
    }
}
