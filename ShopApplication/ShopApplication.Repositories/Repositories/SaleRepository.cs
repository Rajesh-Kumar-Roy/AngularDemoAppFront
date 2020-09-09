using ShopApplication.Context.ProjectDbContext;
using ShopApplication.Models.EntityModels.Sales;
using ShopApplication.Repositories.Base;
using ShopApplication.Repositories.IRContracts;

namespace ShopApplication.Repositories.Repositories
{
    public class SaleRepository:BaseRepository<Sale>,ISaleRepository
    {
        private Microsoft.EntityFrameworkCore.DbContext db;

        public ShopApplicationDbContext Context
        {
            get { return (ShopApplicationDbContext) db; }
        }
        public SaleRepository(Microsoft.EntityFrameworkCore.DbContext db):base(db)
        {
            this.db = db;
        }
    }
}
