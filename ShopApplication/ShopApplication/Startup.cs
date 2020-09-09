using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ShopApplication.Context.ProjectDbContext;
using ShopApplication.Manager.IMContract;
using ShopApplication.Manager.Managers;
using ShopApplication.Repositories.IRContracts;
using ShopApplication.Repositories.Repositories;
using ShopApplication.Utilities;

namespace ShopApplication
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            //services.AddMvc().AddJsonOptions(options =>
            //{
            //    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            //    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            //});

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
            services.AddControllers().AddNewtonsoftJson();
            services.AddTransient<IUtilitiManager, UtilitiManager>();
            services.AddAutoMapper();
            services.AddDbContext<ShopApplicationDbContext>(options =>
            {
                options.UseSqlServer("server=DESKTOP-R53ADIM; Database=ShopApplicationDbContext;Integrated Security=true;");
            });
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
            app.UseCors("CorsPolicy");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
