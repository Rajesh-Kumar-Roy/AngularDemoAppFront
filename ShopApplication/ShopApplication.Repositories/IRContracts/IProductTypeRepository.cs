using System.Collections.Generic;
using System.Linq;
using ShopApplication.Models.EntityModels.ProductModel;

namespace ShopApplication.Repositories.IRContracts
{
    public interface IProductTypeRepository:IBaseRepository<ProductType>
    {
        ICollection<ProductType> GetAllProductType();
        IQueryable<string> GetProductTypeByTypeId(int id);
    }
}
