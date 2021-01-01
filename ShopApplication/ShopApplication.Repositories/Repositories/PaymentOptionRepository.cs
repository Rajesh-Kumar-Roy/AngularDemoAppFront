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
    public class PaymentOptionRepository: BaseRepository<PaymentOption>, IPaymentOptionRepository
    {
        private DbContext db;

        public ShopApplicationDbContext Context
        {
            get{ return (ShopApplicationDbContext) db;}
        }

        public PaymentOptionRepository(DbContext db) : base(db)
        {
            this.db = db;
        }

        public ICollection<PaymentOption> GetAllFalseData()
        {
            return Context.PaymentOptions.Where(c => c.IsDelete == false).OrderByDescending(c=>c.Id).ToList();
        }
    }
}
