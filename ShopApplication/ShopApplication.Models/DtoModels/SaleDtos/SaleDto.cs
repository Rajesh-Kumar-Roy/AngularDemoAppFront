using System;
using System.Collections.Generic;
using System.Text;
using ShopApplication.Models.EntityModels.Sales;

namespace ShopApplication.Models.DtoModels.SaleDtos
{
    public class SaleDto
    {
        public int Id { get; set; }
        public string CustomerName { get; set; }
        public string MobileNo { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public ICollection<SaleDetailDto> SaleDetailDtos { get; set; }

    }
}
