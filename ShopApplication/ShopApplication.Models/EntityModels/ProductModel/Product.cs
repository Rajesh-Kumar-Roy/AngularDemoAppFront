﻿using System.Collections.Generic;
using ShopApplication.Models.EntityModels.Sales;

namespace ShopApplication.Models.EntityModels.ProductModel
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }

        public int ProductTypeId { get; set; }
        public ProductType ProductType { get; set; }
        public ICollection<SaleDetail> SalesDetails { get; set; }
        
    }
}
