using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using ShopApplication.Manager.Base;
using ShopApplication.Manager.IMContract;
using ShopApplication.Models.EntityModels.PaymentModels;
using ShopApplication.Repositories.Base;
using ShopApplication.Repositories.IRContracts;

namespace ShopApplication.Manager.Managers
{
    public class PaymentManger: BaseManager<Payment>,IPaymentManager
    {
        private IPaymentRepository _iPaymentRepository;
        public PaymentManger(IPaymentRepository iPaymentRepository) : base(iPaymentRepository)
        {
            _iPaymentRepository = iPaymentRepository;
        }
    }
}
