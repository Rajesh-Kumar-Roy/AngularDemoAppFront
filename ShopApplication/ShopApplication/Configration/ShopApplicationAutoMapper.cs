using AutoMapper;
using ShopApplication.Models.DtoModels.ProductDtos;
using ShopApplication.Models.DtoModels.SaleDtos;
using ShopApplication.Models.EntityModels.ProductModel;
using ShopApplication.Models.EntityModels.Sales;

namespace ShopApplication.Configration
{
    public class ShopApplicationAutoMapper : Profile
    {
        public ShopApplicationAutoMapper()
        {
            CreateMap<ProductDto, Product>().ReverseMap();
            CreateMap<ProductTypeDto, ProductType>().ReverseMap();
            CreateMap<SaleDto, Sale>().ReverseMap();
            CreateMap<SaleDetailDto, SaleDetail>().ReverseMap();
        }
    }
}
