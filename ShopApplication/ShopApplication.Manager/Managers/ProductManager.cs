using System.Collections.Generic;
using ShopApplication.Manager.Base;
using ShopApplication.Manager.IMContract;
using ShopApplication.Models.EntityModels.ProductModel;
using ShopApplication.Repositories.IRContracts;

namespace ShopApplication.Manager.Managers
{
    public class ProductManager:BaseManager<Product>,IProductManager
    {
        private IProductRepository _productRepository;
        public ProductManager(IProductRepository productRepository): base(productRepository)
        {
            _productRepository = productRepository;
        }

        public ICollection<Product> GetProductByTypeId(int productTypeId)
        {
            return _productRepository.GetProductByTypeId(productTypeId);
        }
    }
}
