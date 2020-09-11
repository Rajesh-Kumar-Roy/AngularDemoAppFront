using System;
using System.Collections.Generic;
using System.Text;
using ShopApplication.Models.EntityModels.ProductModel;
using ShopApplication.Models.EntityModels.Sales;
using ShopApplication.Models.ModelContracts;

namespace ShopApplication.Models.DtoModels.SaleDtos
{
    public class SaleDetailDto:IEntity,IDelete
    {
        public int Id { get; set; }
        public double UnitPrice { get; set; }
        public decimal Qty { get; set; }
        public decimal TotalPrice { get; set; }
        public string Description { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int SaleId { get; set; }

        public bool IsDelete { get; set; }
    }
}
