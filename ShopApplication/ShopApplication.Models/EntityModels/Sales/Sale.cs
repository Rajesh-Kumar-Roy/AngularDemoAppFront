using System;
using System.Collections.Generic;
using ShopApplication.Models.EntityModels.Customers;

namespace ShopApplication.Models.EntityModels.Sales
{
    public class Sale
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string SaleNo { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public virtual Customer Customer { get; set; } 
        public ICollection<SaleDetail> SalesDetails { get; set; }
    }
}
