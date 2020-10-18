using System;
using System.Collections.Generic;
using ShopApplication.Models.EntityModels.Customers;
using ShopApplication.Models.EntityModels.PaymentModels;
using ShopApplication.Models.ModelContracts;

namespace ShopApplication.Models.EntityModels.Sales
{
    public class Sale: IEntity, IDelete
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string SaleNo { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public virtual Customer Customer { get; set; }
        public int PaymentStatusId { get; set; }
        public ICollection<SaleDetail> SalesDetails { get; set; }
        public bool IsDelete { get; set; }
    }
}
