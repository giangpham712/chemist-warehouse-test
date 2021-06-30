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

        public IProductBuilder WithName(string name)
        {
            _product.Name = name;
            return this;
        }

        public IProductBuilder WithPrice(decimal price)
        {
            _product.Price = price;
            return this;
        }

        public IProductBuilder WithType(string type)
        {
            _product.Type = type;
            return this;
        }

        public IProductBuilder WithStatus(bool active)
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
        IProductBuilder WithName(string name);
        IProductBuilder WithPrice(decimal price);
        IProductBuilder WithType(string type);
        IProductBuilder WithStatus(bool active);

        Product Build();
    }
}
