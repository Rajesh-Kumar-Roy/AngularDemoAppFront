using System.Collections.Generic;
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

        public ICollection<SaleDetail> GetAllSaleDetail()
        {
            return _salesDetailsRepository.GetAllSaleDetail();
        }

        public ICollection<SaleDetail> GetSaleDetailBySaleId(int id)
        {
            return _salesDetailsRepository.GetSaleDetailBySaleId(id);
        }
    }
}
