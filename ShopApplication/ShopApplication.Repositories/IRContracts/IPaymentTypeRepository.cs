using System;
using System.Collections.Generic;
using System.Text;
using ShopApplication.Models.EntityModels.PaymentModels;

namespace ShopApplication.Repositories.IRContracts
{
    public interface IPaymentTypeRepository: IBaseRepository<PaymentType>
    {
        ICollection<PaymentType> GetALLFalse();
    }
}
