using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore.Query;
using ShopApplication.Models.EntityModels.Sales;

namespace ShopApplication.Manager.IMContract
{
    public interface ISaleManager:IBaseManager<Sale>
    {
        Sale GetSaleWithDetailsById(int id);
        IQueryable<string> GetCustomerNameByCode(string customerCode);
        ICollection<Sale> GetAllSale();
    }
}
