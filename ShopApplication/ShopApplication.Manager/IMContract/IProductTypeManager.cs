using System.Threading.Tasks;
using ShopApplication.Models.DtoModels.ProductDtos;
using ShopApplication.Models.EntityModels.ProductModel;

namespace ShopApplication.Manager.IMContract
{
    public interface IProductTypeManager:IBaseManager<ProductType>
    {
        ProductTypeDto ConvertModelToDto(ProductType model);
    }
}
