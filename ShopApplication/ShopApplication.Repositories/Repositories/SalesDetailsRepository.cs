using System.Linq;
using ShopApplication.DbContext.DbContext;
using ShopApplication.Models.EntityModels.Sales;
using ShopApplication.Repositories.Base;
using ShopApplication.Repositories.IRContracts;

namespace ShopApplication.Repositories.Repositories
{
    public class SalesDetailsRepository : BaseRepository<SaleDetail>, ISalesDetailsRepository
    {
        private Microsoft.EntityFrameworkCore.DbContext db;

        public ShopApplicationDbContext Context
        {
            get { return (ShopApplicationDbContext) db; }
        }

        public SalesDetailsRepository(Microsoft.EntityFrameworkCore.DbContext db) : base(db)
        {
            this.db = db;
        }

        public IQueryable<double> GetPriceByProductId(int id)
        {
            return Context.SalesDetails.Where(c => c.ProductId == id).Select(c => c.UnitPrice);
        }
    }
}
