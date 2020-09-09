using System.Collections.Generic;
using ShopApplication.Models.ModelContracts;

namespace ShopApplication.Models.EntityModels.ProductModel
{
    public class ProductType: IEntity, IDelete
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public ICollection<Product> Products { get; set; }
        public bool IsDelete { get; set; }
    }
}
