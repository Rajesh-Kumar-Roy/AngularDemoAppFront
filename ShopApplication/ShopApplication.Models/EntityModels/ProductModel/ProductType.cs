using System.Collections.Generic;

namespace ShopApplication.Models.EntityModels.ProductModel
{
    public class ProductType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}
