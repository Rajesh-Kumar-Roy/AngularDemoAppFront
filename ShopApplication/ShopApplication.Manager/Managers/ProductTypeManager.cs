using System.Threading.Tasks;
using AutoMapper;
using ShopApplication.Manager.Base;
using ShopApplication.Manager.IMContract;
using ShopApplication.Models.DtoModels.ProductDtos;
using ShopApplication.Models.EntityModels.ProductModel;
using ShopApplication.Repositories.IRContracts;

namespace ShopApplication.Manager.Managers
{
    public class ProductTypeManager:BaseManager<ProductType>,IProductTypeManager
    {
        private IProductTypeRepository _productTypeRepository;
        private IMapper _iMapper;
        public ProductTypeManager(IProductTypeRepository productTypeRepository, IMapper iMapper) : base(productTypeRepository)
        {
            _productTypeRepository = productTypeRepository;
        }

        public  ProductTypeDto ConvertModelToDto(ProductType model)
        {
            if (model == null) { return null;}

            var dto = _iMapper.Map<ProductTypeDto>(model);
            return dto;
        }
    }
}
