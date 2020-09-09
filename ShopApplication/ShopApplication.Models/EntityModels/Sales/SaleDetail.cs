using ShopApplication.Models.EntityModels.ProductModel;
using ShopApplication.Models.ModelContracts;

namespace ShopApplication.Models.EntityModels.Sales
{
    public class SaleDetail: IEntity, IDelete
    {
        public int Id { get; set; }
        public double UnitPrice { get; set; }
        public decimal Qty { get; set; }
        public decimal TotalPrice { get; set; }
        public string Description { get; set; }
        public int ProductId { get; set; }
        public Product  Product { get; set; }
        public int SaleId { get; set; }
        public Sale Sale { get; set; }

        public bool IsDelete { get; set; }
    }
}
