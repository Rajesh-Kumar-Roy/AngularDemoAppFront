using System.Collections.Generic;
using ShopApplication.Models.EntityModels.ProductModel;

namespace ShopApplication.Repositories.IRContracts
{
    public interface IProductRepository:IBaseRepository<Product>
    {
        ICollection<Product> GetProductByTypeId(int productTypeId);
        ICollection<Product> GetAllProduct();
    }
}
