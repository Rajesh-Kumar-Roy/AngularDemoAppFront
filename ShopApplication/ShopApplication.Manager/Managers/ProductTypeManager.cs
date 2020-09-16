using System.Collections.Generic;
using System.Linq;
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
        private readonly IProductTypeRepository Repository;
        private readonly IMapper _iMapper;
        public ProductTypeManager(IProductTypeRepository productTypeRepository, IMapper iMapper) : base(productTypeRepository)
        {
            Repository = productTypeRepository;
            _iMapper = iMapper;
        }

        public  ProductTypeDto ConvertModelToDto(ProductType model)
        {
            if (model == null) { return null;}

            var dto = _iMapper.Map<ProductTypeDto>(model);
            return dto;
        }

        public ICollection<ProductType> GetAllProductType()
        {
            return Repository.GetAllProductType();
        }

        public IQueryable<string> GetProductTypeByTypeId(int id)
        {
            return Repository.GetProductTypeByTypeId(id);
        }
    }
}
