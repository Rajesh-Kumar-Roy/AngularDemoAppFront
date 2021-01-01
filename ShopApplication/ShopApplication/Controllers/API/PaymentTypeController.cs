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
    public class PaymentTypeController : ControllerBase
    {
        private IPaymentTypeManager _iPaymentTypeManager;
        private IMapper _iMapper;

        public PaymentTypeController(IPaymentTypeManager iPaymentTypeManager, IMapper iMapper)
        {
            _iPaymentTypeManager = iPaymentTypeManager;
            _iMapper = iMapper;
        }
        [HttpGet]
        // api/paymentType
        public IActionResult Get()
        
        {
            var item = _iPaymentTypeManager.GetAll();
            if (item == null)
            {
                return BadRequest(new {error = "Payment Type Not Found!!"});
            }

            return Ok(item);
        }
        [HttpGet("GetAllFalse")]
        // api/paymentType/getAllFalseData
        public IActionResult GetAllFalseDate()
        {
            var items = _iPaymentTypeManager.GetALLFalse();
            if (items == null)
            {
                return BadRequest(new {error = "Data Not Found!!"});
            }

            return Ok(items);
        }
        [HttpPost]
        public IActionResult Post([FromBody] PaymentTypeDto model)
        {
            if (ModelState.IsValid)
            {
                var paymentType = _iMapper.Map<PaymentType>(model);
                var added = _iPaymentTypeManager.Add(paymentType);
                if (added)
                {
                    return Ok(paymentType);
                }

                return BadRequest(new { error = "Failed to Add Payment Type!!" });
            }

            return BadRequest(new {error = "Not Valid Payment Type!!"});

        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var paymentTypeItem = _iPaymentTypeManager.GetById(id);
            if (paymentTypeItem == null)
            {
                return BadRequest(new {error = "Can not found Payment type!!"});
            }

            return Ok(paymentTypeItem);
        }

        [HttpPut("{id}")]

        public IActionResult Put(int id, [FromBody] PaymentTypeDto model)
        {
            var retrivePaymentType = _iPaymentTypeManager.GetById(id);
            if (retrivePaymentType == null)
            {
                return BadRequest(new {error = "Can Not found Payment Type!!"});
            }

            var paymentType = _iMapper.Map<PaymentType>(model);
            retrivePaymentType.Name = paymentType.Name;
            retrivePaymentType.Description = paymentType.Description;
            retrivePaymentType.IsDelete = retrivePaymentType.IsDelete;
            bool isUpdate = _iPaymentTypeManager.Update(retrivePaymentType);
            if (isUpdate)
            {
                return Ok(retrivePaymentType);
            }

            return BadRequest(new {error = "Failed to Update Data!!"});
        }
    }
}
