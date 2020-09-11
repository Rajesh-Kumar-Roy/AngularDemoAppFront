using ShopApplication.Models.ModelContracts;

namespace ShopApplication.Models.DtoModels.ProductDtos
{
    public class ProductTypeDto:IEntity,IDelete
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public bool IsDelete { get; set; }
    }
}
