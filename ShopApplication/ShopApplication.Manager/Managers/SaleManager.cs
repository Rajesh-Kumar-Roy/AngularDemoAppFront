using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore.Query;
using ShopApplication.Manager.Base;
using ShopApplication.Manager.IMContract;
using ShopApplication.Models.EntityModels.Sales;
using ShopApplication.Repositories.IRContracts;

namespace ShopApplication.Manager.Managers
{
    public class SaleManager:BaseManager<Sale>,ISaleManager
    {
        private ISaleRepository _saleRepository;
        public SaleManager(ISaleRepository saleRepository):base(saleRepository)
        {
            _saleRepository = saleRepository;
        }

        public Sale GetSaleWithDetailsById(int id)
        {
            return _saleRepository.GetSalaWithDetailsById(id);
        }

        public IQueryable<string> GetCustomerNameByCode(string customerCode)
        {
            return _saleRepository.GetCustomerNameByCode(customerCode);
        }

        public ICollection<Sale> GetAllSale()
        {
            return _saleRepository.GetAllSale();
        }
    }
}
