using System.Linq;
using ShopApplication.Manager.Base;
using ShopApplication.Manager.IMContract;
using ShopApplication.Models.EntityModels.Sales;
using ShopApplication.Repositories.IRContracts;

namespace ShopApplication.Manager.Managers
{
    public class SalesDetailsManager:BaseManager<SaleDetail>,ISalesDetailsManager
    {
        private ISalesDetailsRepository _salesDetailsRepository;
        public SalesDetailsManager(ISalesDetailsRepository salesDetailsRepository):base(salesDetailsRepository)
        {
            _salesDetailsRepository = salesDetailsRepository;
        }


        public IQueryable<double> GetPriceByProductId(int id)
        {
            return _salesDetailsRepository.GetPriceByProductId(id);
        }
    }
}
