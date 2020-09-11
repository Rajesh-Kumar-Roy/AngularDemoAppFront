using System.Collections.Generic;
using ShopApplication.Models.EntityModels.ProductModel;
using ShopApplication.Models.EntityModels.Sales;
using ShopApplication.Models.ModelContracts;

namespace ShopApplication.Models.DtoModels.ProductDtos
{
    public class ProductDto:IEntity,IDelete
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }

        public int ProductTypeId { get; set; }
        public string ProductTypeName { get; set; }
        public bool IsDelete { get; set; }
    }
}
