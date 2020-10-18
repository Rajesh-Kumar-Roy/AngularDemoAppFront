using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
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

        public Sale GetSalaWithDetailsById(int id)
        {
            return Context.Sales.Include(c => c.SalesDetails)
               
                .ThenInclude(d=>d.Product)
                .ThenInclude(p=>p.ProductType)

                .Include(c => c.SalesDetails)
                 .Include(p=>p.Customer)
                .Single(c => c.Id == id);
        }

        public IQueryable<string> GetCustomerNameByCode(string customerCode)
        {
            return Context.Sales.Where(c => c.Customer.CustomerCode == customerCode).Select(c=>c.SaleNo);
        }

        public ICollection<Sale> GetAllSale()
        {
            return Context.Sales.Where(c => c.IsDelete == false).Include(c => c.SalesDetails).ThenInclude(d=>d.Product).ThenInclude(d=>d.ProductType)
                .Include(c=>c.Customer).OrderByDescending(d=>d.Id)
                .ToList();
        }
    }
}
