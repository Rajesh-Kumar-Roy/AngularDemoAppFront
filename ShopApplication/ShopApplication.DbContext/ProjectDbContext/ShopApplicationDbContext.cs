using System.IO;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ShopApplication.Models.EntityModels.Customers;
using ShopApplication.Models.EntityModels.PaymentModels;
using ShopApplication.Models.EntityModels.ProductModel;
using ShopApplication.Models.EntityModels.Sales;
using ShopApplication.Models.UserModels;

namespace ShopApplication.Context.ProjectDbContext
{
    public class ShopApplicationDbContext : IdentityDbContext<ApplicationUser>
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
            // optionsBuilder.UseSqlServer("server=DESKTOP-R53ADIM; Database=ShopApplicationDbContext;Integrated Security=true;");
            if (!optionsBuilder.IsConfigured)
            {
                IConfigurationRoot configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json")
                    .Build();
                var connectionString = configuration.GetConnectionString("DefaultConnection");
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        #endregion

        #region Db Set
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<SaleDetail> SalesDetails { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<MobileBankingType> MobileBankingTypes { get; set; }
        public DbSet<PaymentOption> PaymentOptions { get; set; }
        public DbSet<PaymentType> PaymentTypes { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }

        #endregion

        #region  ModelBulder

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            ContextModelBuilder cont = new ContextModelBuilder();
            cont.AllModelBuilder(modelBuilder);
            base.OnModelCreating(modelBuilder);

        }

        #endregion

    }
}
