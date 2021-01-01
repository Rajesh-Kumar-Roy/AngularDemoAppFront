using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using ShopApplication.Context.ProjectDbContext;
using ShopApplication.Models.EntityModels.ProductModel;
using ShopApplication.Repositories.Base;
using ShopApplication.Repositories.IRContracts;

namespace ShopApplication.Repositories.Repositories
{
    public class ProductRepository:BaseRepository<Product>,IProductRepository
    {
        private Microsoft.EntityFrameworkCore.DbContext db;

        public ShopApplicationDbContext Context
        {
            get { return (ShopApplicationDbContext) db; }
        }
       
        public ProductRepository(Microsoft.EntityFrameworkCore.DbContext db):base(db)
        {
            this.db = (ShopApplicationDbContext)db;
        }

        public ICollection<Product> GetProductByTypeId(int productTypeId)
        {
            return Context.Products.Where(c => c.ProductTypeId == productTypeId && c.IsDelete == false).Include(c=>c.ProductType).ToList();
        }

        public ICollection<Product> GetAllProduct()
        {
            return Context.Products.Where(c => c.IsDelete == false).OrderByDescending(c => c.Id).Include(d=>d.ProductType).ToList();
        }
    }
}
