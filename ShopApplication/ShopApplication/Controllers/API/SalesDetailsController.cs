using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopApplication.Manager.IMContract;
using ShopApplication.Models.EntityModels.Sales;

namespace ShopApplication.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesDetailsController : ControllerBase
    {
        public ISalesDetailsManager _iSalesDetailsManager;

        public SalesDetailsController(ISalesDetailsManager iSalesDetailsManager)
        {
            _iSalesDetailsManager = iSalesDetailsManager;
        }
        [HttpGet]
        public IActionResult Get()
        {


            var salesDetails = _iSalesDetailsManager.GetAll();
            if (salesDetails == null)
            {
                return BadRequest(new { error = "Empty Sale Item!" });
            }
            return Ok(salesDetails);
        }

        [HttpPost]
        public IActionResult Post([FromBody] SaleDetail salesDetails)
        {
            if (ModelState.IsValid)
            {

                bool isAdded = _iSalesDetailsManager.Add(salesDetails);
                if (isAdded)
                {
                    return Ok(salesDetails);
                }

                return BadRequest(new { error = "Failed to Add!" });
            }

            return BadRequest(new { error = "Model Sate is Not Valid! " });
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var saleDetails = _iSalesDetailsManager.GetById(id);
            if (saleDetails == null)
            {
                return BadRequest(new { error = "Can not Get Sale!" });
            }

            return Ok(saleDetails);
        }


        [HttpGet("getPriceByProductId/{id:int}")]
        public IActionResult GetPriceByProductId(int id)
        {
            var saleDetails = _iSalesDetailsManager.GetPriceByProductId(id);
            if (saleDetails == null)
            {
                return BadRequest(new { error = "Can not Get Sale!" });
            }

            return Ok(saleDetails);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] SaleDetail saledDetails)
        {
            var retriveSalesDetails = _iSalesDetailsManager.GetById(id);
            if (retriveSalesDetails == null)
            {
                return BadRequest(new { error = "product not Found!" });
            }

           
            retriveSalesDetails.UnitPrice = saledDetails.UnitPrice;
            retriveSalesDetails.Description = saledDetails.Description;
            retriveSalesDetails.Qty = saledDetails.Qty;
            retriveSalesDetails.TotalPrice = saledDetails.TotalPrice;
            retriveSalesDetails.ProductId = saledDetails.ProductId;
            retriveSalesDetails.SaleId = saledDetails.SaleId;

            bool isUpdate = _iSalesDetailsManager.Update(retriveSalesDetails);
            if (isUpdate)
            {
                return Ok(retriveSalesDetails);
            }

            return BadRequest(new { error = "Failed!" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var retriveSalesDetails = _iSalesDetailsManager.GetById(id);
            if (retriveSalesDetails == null)
            {
                return BadRequest(new { error = " not Found!" });
            }

            bool isDelete = _iSalesDetailsManager.Remove(retriveSalesDetails,false);
            if (isDelete)
            {
                return Ok(retriveSalesDetails);
            }

            return BadRequest(new { error = "Failed To Delete!" });
        }
    }
}
