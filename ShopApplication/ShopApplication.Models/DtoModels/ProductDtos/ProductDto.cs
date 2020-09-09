using System.Collections.Generic;
using ShopApplication.Models.EntityModels.ProductModel;
using ShopApplication.Models.EntityModels.Sales;

namespace ShopApplication.Models.DtoModels.ProductDtos
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }

        public int ProductTypeId { get; set; }
        public string ProductTypeName { get; set; }
    }
}
