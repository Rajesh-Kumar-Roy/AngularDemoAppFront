using ShopApplication.Context.ProjectDbContext;
using ShopApplication.Models.EntityModels.ProductModel;
using ShopApplication.Repositories.Base;
using ShopApplication.Repositories.IRContracts;

namespace ShopApplication.Repositories.Repositories
{
    public class ProductTypeRepository:BaseRepository<ProductType>,IProductTypeRepository
    {
        private Microsoft.EntityFrameworkCore.DbContext db;

        public ShopApplicationDbContext Context
        {
            get { return (ShopApplicationDbContext) db; }
        }

        public ProductTypeRepository(Microsoft.EntityFrameworkCore.DbContext db) : base(db)
        {
            this.db = db;
        }
    }
}
