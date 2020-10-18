using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore.Query;
using ShopApplication.Models.EntityModels.Sales;

namespace ShopApplication.Repositories.IRContracts
{
    public interface ISaleRepository:IBaseRepository<Sale>
    {
        Sale GetSalaWithDetailsById(int id);
        IQueryable<string> GetCustomerNameByCode(string customerCode);
        ICollection<Sale> GetAllSale();
    }
}
