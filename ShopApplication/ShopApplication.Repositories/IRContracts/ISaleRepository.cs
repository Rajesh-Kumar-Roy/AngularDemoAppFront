using System.Linq;
using Microsoft.EntityFrameworkCore.Query;
using ShopApplication.Models.EntityModels.Sales;

namespace ShopApplication.Repositories.IRContracts
{
    public interface ISaleRepository:IBaseRepository<Sale>
    {
        IQueryable<string> GetCustomerNameByCode(string customerCode);
    }
}
