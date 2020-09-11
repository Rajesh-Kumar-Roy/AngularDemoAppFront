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

        public IQueryable<string> GetCustomerNameByCode(string customerCode)
        {
            return _saleRepository.GetCustomerNameByCode(customerCode);
        }
    }
}
