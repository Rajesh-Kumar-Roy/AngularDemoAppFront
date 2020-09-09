using System.Linq;
using ShopApplication.Models.EntityModels.Sales;

namespace ShopApplication.Manager.IMContract
{
    public interface ISalesDetailsManager:IBaseManager<SaleDetail>
    {
        IQueryable<double> GetPriceByProductId(int id);
    }
}
