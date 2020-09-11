using Microsoft.EntityFrameworkCore;
using ShopApplication.Models.EntityModels.Customers;
using ShopApplication.Models.EntityModels.ProductModel;
using ShopApplication.Models.EntityModels.Sales;

namespace ShopApplication.Context.ProjectDbContext
{
    public class ShopApplicationDbContext : DbContext
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
        public DbSet<Customer> Customers { get; set; }

        #endregion

        #region  ModelBulder

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            ContextModelBuilder cont = new ContextModelBuilder();
            cont.AllModelBuilder(modelBuilder);

        }

        #endregion

    }
}
