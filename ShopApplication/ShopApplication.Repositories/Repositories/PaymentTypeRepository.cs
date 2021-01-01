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
    public class PaymentTypeRepository: BaseRepository<PaymentType>, IPaymentTypeRepository
    {
        private DbContext db;

        public ShopApplicationDbContext Context
        { get { return (ShopApplicationDbContext) db; }
        }

        public PaymentTypeRepository(DbContext db) : base(db)
        {
            this.db = db;
        }

        public ICollection<PaymentType> GetALLFalse()
        {
            return Context.PaymentTypes.Where(c => c.IsDelete == false).OrderByDescending(d => d.Id).ToList();
        }
    }
}
