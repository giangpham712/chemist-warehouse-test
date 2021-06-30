using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChemistWarehouse.TechnicalTest.Api.Extensions;
using ChemistWarehouse.TechnicalTest.Application.Products;
using ChemistWarehouse.TechnicalTest.Domain.Products;
using ChemistWarehouse.TechnicalTest.EntityFramework;
using ChemistWarehouse.TechnicalTest.EntityFramework.Repositories;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;

namespace ChemistWarehouse.TechnicalTest.Api
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

            services.AddControllers()
                .AddFluentValidation(c => c.RegisterValidatorsFromAssemblyContaining<ProductValidator>());

            services.AddCors(options =>
            {
                options.AddPolicy("Default", builder =>
                {
                    builder
                        .WithOrigins("http://localhost:4100", "http://localhost:4200")
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });

            services.AddDbContext<ChemistWarehouseDbContext>(options => options.UseSqlServer(Configuration["ConnectionStrings:DefaultConnection"]));

            services.AddAutoMapper(config =>
            {
                config.AddProfile<ProductMapperProfile>();
            });

            services.AddTransient<IProductRepository, EfProductRepository>();
            services.AddTransient<IProductService, ProductService>();
            services.AddTransient<IProductBuilderFactory, ProductBuilderFactory>();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ChemistWarehouse.TechnicalTest.Api", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ChemistWarehouse.TechnicalTest.Api v1"));
            }

            app.UseCors("Default");

            app.UseHttpsRedirection();

            app.UseCustomExceptionHandler();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
