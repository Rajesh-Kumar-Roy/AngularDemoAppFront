using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using ShopApplication.Context.ProjectDbContext;
using ShopApplication.Models.EntityModels.PaymentModels;
using ShopApplication.Repositories.Base;
using ShopApplication.Repositories.IRContracts;

namespace ShopApplication.Repositories.Repositories
{
    public class PaymentRepository: BaseRepository<Payment>,IPaymentRepository
    {
        private DbContext db;
        public PaymentRepository(DbContext db) : base(db)
        {
            this.db = db;
        }

        public ShopApplicationDbContext Context
        {
            get { return (ShopApplicationDbContext) db; }
        }
    }
}
