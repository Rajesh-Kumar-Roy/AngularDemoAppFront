using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using ShopApplication.Context.ProjectDbContext;
using ShopApplication.Models.EntityModels.Customers;
using ShopApplication.Repositories.Base;
using ShopApplication.Repositories.IRContracts;

namespace ShopApplication.Repositories.Repositories
{
    public class CustomerRepository:BaseRepository<Customer>,ICustomerRepository
    {
        private DbContext db;

        public ShopApplicationDbContext Context
        {
            get { return (ShopApplicationDbContext) db; }
        }
        public CustomerRepository(DbContext db) : base(db)
        {
            this.db = db;
        }

        public IQueryable<string> GetNameByCustomerCode(string customerCode)
        {
            return Context.Customers.Where(c => c.CustomerCode == customerCode).Select(c => c.FirstName);
        }

        public ICollection<Customer> GetAllCustomer()
        {
            return Context.Customers.Where(c => c.IsDelete == false).OrderByDescending(c=>c.Id).ToList();
        }
    }
}
