using System;
using System.Collections.Generic;
using System.Text;
using ShopApplication.Manager.Base;
using ShopApplication.Manager.IMContract;
using ShopApplication.Models.EntityModels.PaymentModels;
using ShopApplication.Repositories.IRContracts;

namespace ShopApplication.Manager.Managers
{
    public class PaymentTypeManager: BaseManager<PaymentType>, IPaymentTypeManager
    {
        private IPaymentTypeRepository _ipaymentTypeRepository;
        public PaymentTypeManager(IPaymentTypeRepository ipaymentTypeRepository) : base(ipaymentTypeRepository)
        {
            _ipaymentTypeRepository = ipaymentTypeRepository;
        }
    }
}
