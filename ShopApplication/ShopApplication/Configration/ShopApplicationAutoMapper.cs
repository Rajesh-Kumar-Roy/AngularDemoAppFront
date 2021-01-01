using AutoMapper;
using ShopApplication.Models.DtoModels.PaymentDto;
using ShopApplication.Models.DtoModels.ProductDtos;
using ShopApplication.Models.DtoModels.SaleDtos;
using ShopApplication.Models.EntityModels.PaymentModels;
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
            CreateMap<SaleDt, Sale>().ReverseMap();
            CreateMap<SaleDetailDto, SaleDetail>().ReverseMap();
            CreateMap<Payment, PaymentDto>().ReverseMap();
            CreateMap<PaymentType, PaymentTypeDto>().ReverseMap();
            CreateMap<MobileBankingType, MobileBankingTypeDto>().ReverseMap();
            CreateMap<PaymentOptionDto, PaymentOption>().ReverseMap();
        }
    }
}
