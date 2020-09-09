using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopApplication.Manager.IMContract;
using ShopApplication.Models.EntityModels.ProductModel;

namespace ShopApplication.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductTypeController : ControllerBase
    {
        private IProductTypeManager _productTypeManager;

        public ProductTypeController(IProductTypeManager productTypeManager)
        {
            _productTypeManager = productTypeManager;
        }
        [HttpGet]
        public IActionResult Get()
        {
            var productType = _productTypeManager.GetAll();

            if (productType == null)
            {
                return BadRequest(new {error = "Not Found!"});
            }

            return Ok(productType);
        }

        [HttpPost]
        public IActionResult Post([FromBody] ProductType productType)
        {
            if (ModelState.IsValid)
            {
                bool isAdded = _productTypeManager.Add(productType);
                if (isAdded)
                {
                    return Ok(productType);
                }

                return BadRequest(new {error = "Failed To Add!"});
            }

            return BadRequest(new {error = "Model  is not valid!!"});
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var productType = _productTypeManager.GetById(id);
            if (productType == null)
            {
                return BadRequest(new {error = "Can not Get Product Type!!!"});
            }

            return Ok(productType);
        }

        [HttpPut("{id}")]
        public IActionResult put(int id)
        {
            var retriveProductType = _productTypeManager.GetById(id);
            if (retriveProductType == null)
            {
                return BadRequest(new {error = "Can not get"});
            }

            bool isUpdate = _productTypeManager.Update(retriveProductType);
            if (isUpdate)
            {
                return Ok(retriveProductType);
            }

            return BadRequest(new {error = "Failed to Update!!!"});

        }

    }
}