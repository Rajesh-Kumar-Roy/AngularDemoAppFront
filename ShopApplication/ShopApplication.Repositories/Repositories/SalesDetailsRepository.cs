using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using ShopApplication.Context.ProjectDbContext;
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
        public ICollection<SaleDetail> GetAllSaleDetail()
        {
            return Context.SalesDetails.Where(c => c.IsDelete == false)
                .Include(c => c.Product)
                .ThenInclude(d => d.ProductType)
                .Include(c => c.Sale)
                .ThenInclude(c => c.Customer)
                .ToList();
        }

        public ICollection<SaleDetail> GetSaleDetailBySaleId(int id)
        {
            return Context.SalesDetails.Where(c => c.SaleId == id)
                .Include(c=>c.Product)
                .ThenInclude(d=>d.ProductType)
                .ToList();
        }
    }
}
