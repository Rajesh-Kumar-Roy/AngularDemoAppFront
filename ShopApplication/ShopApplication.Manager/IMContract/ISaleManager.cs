using System.Linq;
using Microsoft.EntityFrameworkCore.Query;
using ShopApplication.Models.EntityModels.Sales;

namespace ShopApplication.Manager.IMContract
{
    public interface ISaleManager:IBaseManager<Sale>
    {
        IQueryable<string> GetCustomerNameByCode(string customerCode);
    }
}
