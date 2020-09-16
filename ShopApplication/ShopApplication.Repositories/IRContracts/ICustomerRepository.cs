using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore.Query;
using ShopApplication.Models.EntityModels.Customers;

namespace ShopApplication.Repositories.IRContracts
{
    public interface ICustomerRepository:IBaseRepository<Customer>
    {
        IQueryable<string> GetNameByCustomerCode(string customerCode);
        ICollection<Customer> GetAllCustomer();
    }
}
