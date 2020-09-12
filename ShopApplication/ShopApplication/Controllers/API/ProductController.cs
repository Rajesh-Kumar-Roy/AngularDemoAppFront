using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopApplication.Manager.IMContract;
using ShopApplication.Models.DtoModels.ProductDtos;
using ShopApplication.Models.EntityModels.ProductModel;
using ShopApplication.UtilityManager;

namespace ShopApplication.Controllers.API
{
    [Route("api/product")]
    [EnableCors("CorsPolicy")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IProductManager _productManager;
        private IMapper _mapper;
        private IDropdownManager _utilitiManager;
      

        public ProductController(IProductManager productManager,IMapper mapper,IDropdownManager utilitiManager)
        {
            _productManager = productManager;
            _utilitiManager= utilitiManager;
            _mapper = mapper;
        }
        [HttpGet]
        public IActionResult Get()
        {
          
           
            var products = _productManager.GetAll();
            if (products == null)
            {
                return BadRequest(new {error = "Empty Product!"});
            }
            return Ok(products);
        }

        [HttpPost]
        public IActionResult Post([FromBody] ProductDto model)
        {
            if (ModelState.IsValid)
            {
                var product = _mapper.Map<Product>(model);
                bool isAdded = _productManager.Add(product);
                if (isAdded)
                {
                    return Ok(product);
                }

                return BadRequest(new {error = "Failed to Add!"});
            }

            return BadRequest(new {error = "Model Sate is Not Valid! "});
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var product = _productManager.GetById(id);
            if (product == null)
            {
                return BadRequest(new {error = "Can not Get product!"});
            }

            return Ok(product);
        }

      
        [HttpGet("GetProductByTypeId/{typeId}")]
        public IActionResult GetProductByTypeId(int typeId)
        {
            var product = _productManager.GetProductByTypeId(typeId);
            
            if (product == null)
            {
                return BadRequest(new { error = "Can not Get product!" });
            }
            //var jsonData = product.Select(c => new
            //{
            //    c.Id,
            //    c.Name,
            //    c.Description,
            //    c.Price,
            //    c.ProductTypeId,

            //    ProductType = new { c.ProductType.Id, c.ProductType.Name, c.ProductType.Description }

            //});
            return Ok(product);

            
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Product product)
        {
            var retriveProduct = _productManager.GetById(id);
            if (retriveProduct == null)
            {
                return BadRequest(new {error = "product not Found!"});
            }

            retriveProduct.Name = product.Name;
            retriveProduct.Price = product.Price;
            retriveProduct.Description = product.Description;
           
            bool isUpdate = _productManager.Update(retriveProduct);
            if (isUpdate)
            {
                return Ok(retriveProduct);
            }

            return BadRequest(new {error = "Failed!"});
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var retriveProduct = _productManager.GetById(id);
            if (retriveProduct == null)
            {
                return BadRequest(new { error = "product not Found!" });
            }

            bool isDelete = _productManager.Remove(retriveProduct, true);
            if (isDelete)
            {
                return Ok(retriveProduct);
            }

            return BadRequest(new {error = "Failed To Delete!"});
        }

       
       
    }
}