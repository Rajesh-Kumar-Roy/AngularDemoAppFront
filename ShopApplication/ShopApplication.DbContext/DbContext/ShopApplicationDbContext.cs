using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using ShopApplication.Models.EntityModels.ProductModel;
using ShopApplication.Models.EntityModels.Sales;

namespace ShopApplication.DbContext.DbContext
{
    public class ShopApplicationDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public ShopApplicationDbContext()
        {

        }

        public ShopApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        #region Connection String
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer(
                "server=DESKTOP-R53ADIM; Database=ShopApplicationDbContext;Integrated Security=true;");
        }

        #endregion

        #region Db Set
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<SaleDetail> SalesDetails { get; set; }

        #endregion


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region Product

            modelBuilder.Entity<Product>().HasKey(c => c.Id);
            modelBuilder.Entity<Product>().Property(c => c.Name).IsRequired();
            modelBuilder.Entity<Product>().Property(c => c.Price).IsRequired();

            modelBuilder.Entity<Product>().HasOne(c => c.ProductType)
                .WithMany(c => c.Products)
                .HasForeignKey(c => c.ProductTypeId);
           // modelBuilder.Entity("Product");
            #endregion

            #region ProductType
            modelBuilder.Entity<ProductType>().HasKey(c => c.Id);
            modelBuilder.Entity<ProductType>().Property(c => c.Name).IsRequired();
            modelBuilder.Entity<ProductType>().Property(c => c.Code).IsRequired();
            #endregion

            #region Sales and Detail
            modelBuilder.Entity<Sale>().HasKey(c => c.Id);
            modelBuilder.Entity<Sale>().Property(c => c.MobileNo).IsRequired();
            modelBuilder.Entity<Sale>().Property(c => c.CustomerName).IsRequired();
            modelBuilder.Entity<Sale>().Property(c => c.Address).IsRequired();
            modelBuilder.Entity<Sale>().Property(c => c.Date).IsRequired();

            modelBuilder.Entity<SaleDetail>().HasKey(c => c.Id);
            modelBuilder.Entity<SaleDetail>().Property(c => c.UnitPrice).IsRequired();
            modelBuilder.Entity<SaleDetail>().Property(c => c.Qty).IsRequired();
            modelBuilder.Entity<SaleDetail>().HasOne(c => c.Sale)
                .WithMany(c => c.SalesDetails)
                .HasForeignKey(c => c.SaleId);
            modelBuilder.Entity<SaleDetail>().HasOne(p => p.Product)
                .WithMany(p => p.SalesDetails)
                .HasForeignKey(p => p.ProductId);

            #endregion



        }
    }
}
