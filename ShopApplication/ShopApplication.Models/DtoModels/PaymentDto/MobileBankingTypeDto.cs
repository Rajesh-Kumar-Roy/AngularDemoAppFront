using System;
using System.Collections.Generic;
using System.Text;
using ShopApplication.Models.ModelContracts;

namespace ShopApplication.Models.DtoModels.PaymentDto
{
    public class MobileBankingTypeDto:IEntity,IDelete
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsDelete { get; set; }
    }
}
