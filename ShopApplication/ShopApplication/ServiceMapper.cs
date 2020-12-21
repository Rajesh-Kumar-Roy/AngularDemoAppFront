using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ShopApplication.Context.ProjectDbContext;
using ShopApplication.Manager.IMContract;
using ShopApplication.Manager.Managers;
using ShopApplication.Repositories.IRContracts;
using ShopApplication.Repositories.Repositories;
using ShopApplication.UtilityManager;

namespace ShopApplication
{
    public class ServiceMapper
    {
        public IConfiguration Configuration { get; }
        public void ConfigServiceMapper(IServiceCollection services)
        {
            services.AddMvc().AddNewtonsoftJson();
            services.AddControllers().AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.AddTransient<IProductManager, ProductManager>();
            services.AddTransient<IProductTypeManager, ProductTypeManager>();
            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<IProductTypeRepository, ProductTypeRepository>();
            services.AddTransient<Microsoft.EntityFrameworkCore.DbContext, ShopApplicationDbContext>();
            services.AddTransient<ISalesDetailsRepository, SalesDetailsRepository>();
            services.AddTransient<ISaleRepository, SaleRepository>();
            services.AddTransient<ISaleManager, SaleManager>();
            services.AddTransient<ISalesDetailsManager, SalesDetailsManager>();
            services.AddTransient<ICustomerManager, CustomerManager>();
            services.AddTransient<ICustomerRepository, CustomerRepository>();
            services.AddControllers().AddNewtonsoftJson();
            services.AddTransient<IDropdownManager, DropdownManager>();
            services.AddTransient<IPaymentTypeRepository, PaymentTypeRepository>();
            services.AddTransient<IPaymentTypeManager, PaymentTypeManager>();
            services.AddTransient<IPaymentOptionManager, PaymentOptionManager>();
            services.AddTransient<IPaymentOptionRepository, PaymentOptionRepository>();
            services.AddTransient<IMobileBankingTypeRepository, MobileBankingTypeRepository>();
            services.AddTransient<IMobileBankingTypeManager, MobileBankingTypeManger>();
            services.AddTransient<IPaymentManager, PaymentManger>();
            services.AddTransient<IPaymentRepository, PaymentRepository>();
            services.AddAutoMapper();

            #region Add db sting and Identity

           
            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequiredLength = 5;
            });

            #endregion
            

            // services.AddDbContext<ShopApplicationDbContext>(options =>
            // {
            //     options.UseSqlServer("server=DESKTOP-R53ADIM; Database=ShopApplicationDbContext;Integrated Security=true;");
            // });
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });

        }
    }
}
