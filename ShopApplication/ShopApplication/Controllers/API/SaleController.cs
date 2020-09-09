﻿using System;
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


            var sales = _SaleManager.GetAll();
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
        public IActionResult Get(int? id)
        {
            var sale = _SaleManager.GetById(id);
            if (sale == null)
            {
                return BadRequest(new { error = "Can not Get Sale!" });
            }

            return Ok(sale);
        }
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Sale sale)
        {
            var retriveSales = _SaleManager.GetById(id);
            if (retriveSales == null)
            {
                return BadRequest(new { error = "product not Found!" });
            }

            retriveSales.CustomerName = sale.CustomerName;
            retriveSales.Address = sale.Address;
            retriveSales.Description = sale.Description;
            retriveSales.MobileNo = sale.MobileNo;
            retriveSales.Date = sale.Date;
            bool isUpdate = _SaleManager.Update(retriveSales);
            if (isUpdate)
            {
                return Ok(retriveSales);
            }

            return BadRequest(new { error = "Failed!" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var retriveSales = _SaleManager.GetById(id);
            if (retriveSales == null)
            {
                return BadRequest(new { error = " not Found!" });
            }

            bool isDelete = _SaleManager.Remove(retriveSales);
            if (isDelete)
            {
                return Ok(retriveSales  );
            }

            return BadRequest(new { error = "Failed To Delete!" });
        }
    }
}
