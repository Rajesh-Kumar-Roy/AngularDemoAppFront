using System.Collections.Generic;
using ShopApplication.Models.EntityModels.ProductModel;

namespace ShopApplication.Manager.IMContract
{
    public interface IProductManager:IBaseManager<Product>
    {
       ICollection<Product> GetProductByTypeId(int productTypeId);
    }
}
