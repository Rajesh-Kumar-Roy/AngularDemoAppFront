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
    [Produces("application/json")]
    [ApiController]
    public class SaleController : ControllerBase
    {
        public ISaleManager _SaleManager;

        public SaleController(ISaleManager saleManager)
        {
            _SaleManager = saleManager;
        }
        [HttpGet]
        public IActionResult Get()
        {

            var result = UtilityManager.Uitlity.GetCustomerCode();
            var resulta = UtilityManager.Uitlity.GetSaleCode();
            var sales = _SaleManager.GetAll();
            if (sales == null)
            {
                return BadRequest(new { error = "Empty Sale Item!" });
            }
            return Ok(sales);
        }
        [HttpGet("getAllFalse")]
        public IActionResult getAllFalse()
        {
            var sales = _SaleManager.GetAllSale();
            if (sales == null)
            {
                return BadRequest(new { error = "Empty Sale Item!" });
            }
            return Ok(sales);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Sale sale)
        {
            if (ModelState.IsValid)
            {
                //string uniqueNumber = String.Format("{0:d9}", (DateTime.Now.Ticks / 10) % 1000000000);


               
                bool isAdded = _SaleManager.Add(sale);
              
                if (isAdded)
                {
                    return Ok(sale);
                }

                return BadRequest(new { error = "Failed to Add!" });
            }

            return BadRequest(new { error = "Model Sate is Not Valid! " });
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var sale = _SaleManager.GetById(id);
            if (sale == null)
            {
                return BadRequest(new { error = "Can not Get Sale!" });
            }

            return Ok(sale);
        }


        [HttpGet("getSaleBySaleId/{id:int}")]
        public IActionResult GetSaleBySaleId(int id)
        {
            var sale = _SaleManager.GetSaleWithDetailsById(id);
            if (sale == null)
            {
                return BadRequest(new {error = "Sale Item Can not Found!!"});
            }

            return Ok(sale);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Sale sale)
        {
            var retriveSales = _SaleManager.GetById(id);
            if (retriveSales == null)
            {
                return BadRequest(new {error = "product not Found!"});
            }

            retriveSales.Description = sale.Description;
            retriveSales.SaleNo = sale.SaleNo;
            retriveSales.CustomerId = sale.CustomerId;
            retriveSales.Date = sale.Date;
            retriveSales.SalesDetails = sale.SalesDetails;
            bool isUpdate = _SaleManager.Update(retriveSales);
            if (isUpdate)
            {
                return Ok(retriveSales);
            }

            return BadRequest(new { error = "Failed!" });
        }

        [HttpGet("GetCustomerNameByCode/{customerCode}")]
        public IActionResult GetCustomerNameByCode(string customerCode)
        {
            var customer = _SaleManager.GetCustomerNameByCode(customerCode);


            if (customer == null)
            {
                return BadRequest(new { error = "Can not Get product!" });
            }
           
            return Ok(customer);


        }

        [HttpGet("GetSaleCode")]
       
        public IActionResult GetSaleCode()
        {
            var saleCode = UtilityManager.Uitlity.GetSaleCode();
            if (saleCode == null)
            {
                return BadRequest(new {error = "Can not Get Sale Code!"});
            }
           

            return Ok(saleCode);
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var retriveSales = _SaleManager.GetById(id);
            if (retriveSales == null)
            {
                return BadRequest(new { error = " not Found!" });
            }

            bool isDelete = _SaleManager.Remove(retriveSales, false);
            if (isDelete)
            {
                return Ok(retriveSales  );
            }

            return BadRequest(new { error = "Failed To Delete!" });
        }

    }
}
