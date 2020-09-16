using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore.Query;
using ShopApplication.Manager.Base;
using ShopApplication.Manager.IMContract;
using ShopApplication.Models.EntityModels.Customers;
using ShopApplication.Repositories.IRContracts;

namespace ShopApplication.Manager.Managers
{
    public class CustomerManager:BaseManager<Customer>,ICustomerManager
    {
        private ICustomerRepository _iCustomerRepository;
        public CustomerManager(ICustomerRepository iCustomerRepository) : base(iCustomerRepository)
        {
           _iCustomerRepository= iCustomerRepository;
        }


        public IQueryable<string> GetNameByCustomerCode(string customerCode)
        {
            return _iCustomerRepository.GetNameByCustomerCode(customerCode);
        }

        public ICollection<Customer> GetAllCustomer()
        {
            return _iCustomerRepository.GetAllCustomer();
        }
    }
}
