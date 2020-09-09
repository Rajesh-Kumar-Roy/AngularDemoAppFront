using System;
using System.Collections.Generic;
using System.Text;

namespace ShopApplication.Models.EntityModels.Customers
{
    public class Customer
    {
        public int Id { get; set; }
        public string FirstName  { get; set; }
        public string LastName { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string CustomerCode { get; set; }
    }
}
