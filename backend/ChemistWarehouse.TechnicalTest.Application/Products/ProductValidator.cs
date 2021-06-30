using System;
using System.Collections.Generic;
using System.Text;
using ChemistWarehouse.TechnicalTest.Application.Products.Dtos;
using FluentValidation;

namespace ChemistWarehouse.TechnicalTest.Application.Products
{
    public class ProductValidator : AbstractValidator<ProductDto>
    {
        public ProductValidator()
        {
            RuleFor(model => model.Name)
                .NotEmpty().WithMessage("Name must not be empty")
                .MaximumLength(100).WithMessage("Name must not have more than 100 characters");

            RuleFor(model => model.Price)
                .NotEmpty().WithMessage("Price must not be empty")
                .GreaterThanOrEqualTo(0).WithMessage("Price must not be a negative number");

            RuleFor(model => model.Type)
                .NotEmpty().WithMessage("Type must not be empty");
        }
    }
}
