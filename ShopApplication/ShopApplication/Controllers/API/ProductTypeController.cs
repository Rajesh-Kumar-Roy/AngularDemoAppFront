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
                return BadRequest(new { error = "Not Found!" });
            }

            return Ok(productType);
        }
        [HttpGet("getAllFalse")]
        public IActionResult getAllFalse()
        {
            var productType = _productTypeManager.GetAllProductType();
            if (productType == null)
            {
                return BadRequest(new { error = "Empty product type!" });
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

                return BadRequest(new { error = "Failed To Add!" });
            }

            return BadRequest(new { error = "Model  is not valid!!" });
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var productType = _productTypeManager.GetById(id);
            if (productType == null)
            {
                return BadRequest(new { error = "Can not Get Product Type!!!" });
            }

            return Ok(productType);
        }

        [HttpGet("GetProductTypeByTypeId/{typeId}")]
        public IActionResult GetProductTypeByTypeId(int typeId)
        {
            var productType = _productTypeManager.GetProductTypeByTypeId(typeId);

            if (productType == null)
            {
                return BadRequest(new { error = "Can not Get product!" });
            }

            return Ok(productType);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] ProductType model)
        {
            var retriveProductType = _productTypeManager.GetById(id);
            if (retriveProductType == null)
            {
                return BadRequest(new { error = "Can not get" });
            }

            retriveProductType.Name = model.Name;
            retriveProductType.Code = model.Code;
            retriveProductType.Description = model.Description;
            bool isUpdate = _productTypeManager.Update(retriveProductType);
            if (isUpdate)
            {
                return Ok(retriveProductType);
            }

            return BadRequest(new { error = "Failed to Update!!!" });

        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var retriveProduct = _productTypeManager.GetById(id);
            if (retriveProduct == null)
            {
                return BadRequest(new { error = "product Type not Found!" });
            }

            retriveProduct.IsDelete = true;
            bool isDelete = _productTypeManager.Update(retriveProduct);
            if (isDelete)
            {
                return Ok(retriveProduct);
            }

            return BadRequest(new { error = "Failed To Delete!" });
        }

    }
}