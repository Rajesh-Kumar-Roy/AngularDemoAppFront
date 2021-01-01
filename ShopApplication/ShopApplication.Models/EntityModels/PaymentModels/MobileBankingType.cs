using ShopApplication.Models.ModelContracts;

namespace ShopApplication.Models.EntityModels.PaymentModels
{
    public class MobileBankingType : IEntity, IDelete
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsDelete { get; set; }
    }
}