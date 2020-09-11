using System;
using System.Collections.Generic;
using System.Text;
using ShopApplication.Models.EntityModels.Sales;
using ShopApplication.Models.ModelContracts;

namespace ShopApplication.Models.DtoModels.CustomerDto
{
    public class CustomerDto:IEntity,IDelete
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string CustomerCode { get; set; }
        public ICollection<Sale> Sales { get; set; }
        public bool IsDelete { get; set; }
    }
}
