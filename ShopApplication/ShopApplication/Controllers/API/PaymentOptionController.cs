using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopApplication.Manager.IMContract;
using ShopApplication.Models.DtoModels.PaymentDto;
using ShopApplication.Models.EntityModels.PaymentModels;

namespace ShopApplication.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentOptionController : ControllerBase
    {
        private IPaymentOptionManager _iPaymentOptionManager;
        private IMapper _iMapper;
        public PaymentOptionController(IPaymentOptionManager iPaymentOptionManager, IMapper iMapper)
        {
            _iPaymentOptionManager = iPaymentOptionManager;
            _iMapper = iMapper;

        }
        [HttpGet]
        // api/paymentOption
        public IActionResult GetAll()
        {
            var items = _iPaymentOptionManager.GetAll();
            if (items == null)
            {
                return BadRequest(new {error = "No Data Found!!"});
            }

            return Ok(items);

        }

        [HttpGet("getAllFalse")]
        // api/paymentOption/getAllFalse
        public IActionResult GetAllFalseData()
        {
            var items = _iPaymentOptionManager.GetAllFalseData();
            if (items == null)
            {
                return BadRequest(new {error = "No Data Found!!"});
            }

            return Ok(items);
        }

        [HttpGet("{id}")]
        // api/paymentOption
        public IActionResult Get(int id)
        {
            var item = _iPaymentOptionManager.GetById(id);
            if (item == null)
            {
                return BadRequest(new {error = "No Data Found!"});
            }

            return Ok(item);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] PaymentOptionDto model)
        {
            var retriveItem = _iPaymentOptionManager.GetById(id);
            if (retriveItem == null)
            {
                return BadRequest(new {error = "Can Not Found Data!!"});
            }

            var paymentOption = _iMapper.Map<PaymentOption>(model);
            retriveItem.Name = paymentOption.Name;
            retriveItem.Description = paymentOption.Description;
            retriveItem.IsDelete = paymentOption.IsDelete;
            var isUpdate = _iPaymentOptionManager.Update(retriveItem);
            if (!isUpdate)
            {
                return BadRequest(new {error = "Failed to add Update!!"});
            }
            return Ok(retriveItem);
        }

        [HttpPost]
        // api/paymentOption

        public IActionResult Post([FromBody] PaymentOptionDto model)
        {
            if (ModelState.IsValid)
            {
                var paymentOption = _iMapper.Map<PaymentOption>(model);
                bool isAdded = _iPaymentOptionManager.Add(paymentOption);
                if (isAdded)
                {
                    return Ok(paymentOption);
                }

                return BadRequest(new {error = "Failed To Add!!"});
            }

            return BadRequest(new {error = "Model State Is Not Valid!"});

        }
    }
}
