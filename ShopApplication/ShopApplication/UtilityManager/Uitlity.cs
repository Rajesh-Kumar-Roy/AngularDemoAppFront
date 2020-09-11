using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopApplication.Context.ProjectDbContext;

namespace ShopApplication.UtilityManager
{
    public static class Uitlity
    {
        private static ShopApplicationDbContext context = new ShopApplicationDbContext();
        public static string GetCustomerCode()
        {
            var customer = context.Customers.ToList();
            var date = DateTime.Now.ToString("ddMMyyyyhhmmss");
            if (customer.Count>0)
            {
                var customerCode ="CC-"+ date + customer.Select(c=>c.Id).LastOrDefault().ToString();
                return customerCode;
            }
            else
            {
                var customerCode ="CC"+ date + 0;
                return customerCode;
            }

        }
        public static string GetSaleCode()
        {
            var sales = context.Sales.ToList();
            var date = DateTime.Now.ToString("ddMMyyyyhhmmss");
            if (sales.Count > 0)
            {
                var customerCode = "SC-" + date + sales.Select(c => c.Id).LastOrDefault().ToString();
                return customerCode;
            }
            else
            {
                var customerCode = "SC" + date + 0;
                return customerCode;
            }
        }
    }
}
