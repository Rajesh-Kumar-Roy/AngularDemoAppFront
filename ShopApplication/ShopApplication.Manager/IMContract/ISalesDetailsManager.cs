using System.Collections.Generic;
using System.Linq;
using ShopApplication.Models.EntityModels.Sales;

namespace ShopApplication.Manager.IMContract
{
    public interface ISalesDetailsManager:IBaseManager<SaleDetail>
    {
       
        ICollection<SaleDetail> GetAllSaleDetail();
        ICollection<SaleDetail> GetSaleDetailBySaleId(int id);
    }
}
