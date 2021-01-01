using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using ShopApplication.Models.EntityModels.Customers;
using ShopApplication.Models.EntityModels.PaymentModels;
using ShopApplication.Models.EntityModels.ProductModel;
using ShopApplication.Models.EntityModels.Sales;

namespace ShopApplication.Context.ProjectDbContext
{
    public class ContextModelBuilder
    {
        public void AllModelBuilder(ModelBuilder modelBuilder)
        {
            #region ProductType
            modelBuilder.Entity<ProductType>().HasKey(c => c.Id);
            modelBuilder.Entity<ProductType>().Property(c => c.Name).IsRequired();
            modelBuilder.Entity<ProductType>().Property(c => c.Code).IsRequired();
            modelBuilder.Entity<ProductType>().ToTable("ProductType");
            #endregion

            #region Product

            modelBuilder.Entity<Product>().HasKey(c => c.Id);
            modelBuilder.Entity<Product>().Property(c => c.Name).IsRequired();
            modelBuilder.Entity<Product>().Property(c => c.Price).IsRequired();
            modelBuilder.Entity<Product>().Property(c => c.Code).IsRequired();
            modelBuilder.Entity<Product>().HasOne(c => c.ProductType).WithMany(c => c.Products).HasForeignKey(c => c.ProductTypeId);
            modelBuilder.Entity<Product>().ToTable("Product");
            #endregion

            #region Customer

            modelBuilder.Entity<Customer>().HasKey(c => c.Id);
            modelBuilder.Entity<Customer>().Property(c => c.FirstName).IsRequired();
            modelBuilder.Entity<Customer>().Property(c => c.MobileNo).IsRequired();
            modelBuilder.Entity<Customer>().Property(c => c.CustomerCode).IsRequired();
            modelBuilder.Entity<Customer>().ToTable("Customer");

            #endregion

            #region Sales
            modelBuilder.Entity<Sale>().HasKey(c => c.Id);
            modelBuilder.Entity<Sale>().Property(c => c.Date).IsRequired();
            modelBuilder.Entity<Sale>().Property(c => c.SaleNo).IsRequired();
            modelBuilder.Entity<Sale>().HasOne(s => s.Customer).WithMany(s => s.Sales).HasForeignKey(s => s.CustomerId);
            modelBuilder.Entity<Sale>().ToTable("Sale");
            #endregion

            #region SaleDetail
            modelBuilder.Entity<SaleDetail>().HasKey(c => c.Id);
            modelBuilder.Entity<SaleDetail>().Property(c => c.UnitPrice).IsRequired();
            modelBuilder.Entity<SaleDetail>().Property(c => c.Qty).IsRequired();
            modelBuilder.Entity<SaleDetail>().Property(c => c.TotalPrice).IsRequired();
            modelBuilder.Entity<SaleDetail>().HasOne(c => c.Sale).WithMany(c => c.SalesDetails).HasForeignKey(c => c.SaleId);
            modelBuilder.Entity<SaleDetail>().HasOne(p => p.Product).WithMany(p => p.SalesDetails).HasForeignKey(p => p.ProductId);
            modelBuilder.Entity<SaleDetail>().ToTable("SaleDetail");

            #endregion

            #region MobileBankingType

            modelBuilder.Entity<MobileBankingType>().HasKey(c => c.Id);
            modelBuilder.Entity<MobileBankingType>().Property(c => c.Name).IsRequired();
            modelBuilder.Entity<MobileBankingType>().ToTable("MobileBankingType");

            #endregion

            #region PaymentOption

            modelBuilder.Entity<PaymentOption>().HasKey(c => c.Id);
            modelBuilder.Entity<PaymentType>().Property(c => c.Name).IsRequired();
            modelBuilder.Entity<PaymentOption>().ToTable("PaymentOption");

            #endregion

            #region PaymentType

            modelBuilder.Entity<PaymentType>().HasKey(c => c.Id);
            modelBuilder.Entity<PaymentType>().Property(c => c.Name).IsRequired();
            modelBuilder.Entity<PaymentType>().ToTable("PaymentType");

            #endregion

            #region Payment

            modelBuilder.Entity<Payment>().HasKey(c => c.Id);
            modelBuilder.Entity<Payment>().Property(c => c.Amount).IsRequired();
            modelBuilder.Entity<Payment>().Property(c => c.VatAmount).IsRequired();
            modelBuilder.Entity<Payment>().Property(c => c.Pay).IsRequired();
            modelBuilder.Entity<Payment>().Property(c => c.PaymentDate).IsRequired();

            #endregion

            #region Application User

            // modelBuilder.Entity<ApplicationUser>().Property(c => c.PhoneNo).IsRequired();
            // modelBuilder.Entity<ApplicationUser>().Property(c => c.PhoneNo).HasMaxLength(15);

            #endregion

        }
    }
}
