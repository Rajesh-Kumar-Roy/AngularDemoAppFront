using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using ShopApplication.Context.ProjectDbContext;
using ShopApplication.Models.EntityModels.PaymentModels;
using ShopApplication.Repositories.Base;
using ShopApplication.Repositories.IRContracts;

namespace ShopApplication.Repositories.Repositories
{
    public class MobileBankingTypeRepository: BaseRepository<MobileBankingType>,IMobileBankingTypeRepository
    {
        private DbContext db;
        public ShopApplicationDbContext Context
        {
            get { return (ShopApplicationDbContext) db; }
        }
        public MobileBankingTypeRepository(DbContext db) : base(db)
        {
            this.db = db;
        }

        public ICollection<MobileBankingType> GetAllFalse()
        {
            return Context.MobileBankingTypes.Where(c => c.IsDelete == false).OrderByDescending(d => d.Id).ToList();
        }
    }
}
