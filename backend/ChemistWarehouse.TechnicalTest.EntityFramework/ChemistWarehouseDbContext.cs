using System;
using ChemistWarehouse.TechnicalTest.Domain.Products;
using Microsoft.EntityFrameworkCore;

namespace ChemistWarehouse.TechnicalTest.EntityFramework
{
    public class ChemistWarehouseDbContext : DbContext
    {
        public ChemistWarehouseDbContext(DbContextOptions options) : base(options)
        {
        }

        DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>(b =>
            {
                b.Property(p => p.Id).ValueGeneratedOnAdd();
                b.Property(p => p.Name).HasMaxLength(100).IsRequired();
                b.Property(p => p.Price).HasPrecision(18, 2).IsRequired();
                b.Property(p => p.Type).HasMaxLength(20).IsRequired();
            });
        }
    }
}
