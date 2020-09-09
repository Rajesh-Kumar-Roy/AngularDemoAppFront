using System.Linq;
using ShopApplication.Models.EntityModels.Sales;

namespace ShopApplication.Repositories.IRContracts
{
    public interface ISalesDetailsRepository:IBaseRepository<SaleDetail>
    {
        IQueryable<double> GetPriceByProductId(int id);
    }
}
