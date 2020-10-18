using System.Collections.Generic;
using System.Linq;
using ShopApplication.Models.EntityModels.Sales;

namespace ShopApplication.Repositories.IRContracts
{
    public interface ISalesDetailsRepository:IBaseRepository<SaleDetail>
    {
        ICollection<SaleDetail> GetAllSaleDetail();
        ICollection<SaleDetail> GetSaleDetailBySaleId(int id);
    }
}
