using System;
using System.Collections.Generic;
using System.Text;
using ShopApplication.Manager.Base;
using ShopApplication.Manager.IMContract;
using ShopApplication.Models.EntityModels.PaymentModels;
using ShopApplication.Repositories.IRContracts;

namespace ShopApplication.Manager.Managers
{
    public class PaymentOptionManager: BaseManager<PaymentOption>, IPaymentOptionManager
    {
        private IPaymentOptionRepository _iPaymentOptionRepository;
        public PaymentOptionManager(IPaymentOptionRepository iPaymentOptionRepository) : base(iPaymentOptionRepository)
        {
            _iPaymentOptionRepository = iPaymentOptionRepository;
        }

        public ICollection<PaymentOption> GetAllFalseData()
        {
            return _iPaymentOptionRepository.GetAllFalseData();
        }
    }
}
