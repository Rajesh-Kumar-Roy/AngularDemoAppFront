using System;
using System.Collections.Generic;
using System.Text;
using ShopApplication.Manager.Base;
using ShopApplication.Manager.IMContract;
using ShopApplication.Models.EntityModels.PaymentModels;
using ShopApplication.Repositories.IRContracts;

namespace ShopApplication.Manager.Managers
{
    public class MobileBankingTypeManger: BaseManager<MobileBankingType>, IMobileBankingTypeManager
    {
        private IMobileBankingTypeRepository _iMobileBankingTypeRepository;
        public MobileBankingTypeManger(IMobileBankingTypeRepository iMobileBankingTypeRepository) : base(iMobileBankingTypeRepository)
        {
            _iMobileBankingTypeRepository = iMobileBankingTypeRepository;
        }

        public ICollection<MobileBankingType> GetAllFalse()
        {
            return _iMobileBankingTypeRepository.GetAllFalse();
        }
    }
}
