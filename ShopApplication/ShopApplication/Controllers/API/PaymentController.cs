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
    public class PaymentController : ControllerBase
    {
        private IPaymentManager _iPaymentManager;
        private IMapper _iMapper;
        public PaymentController(IPaymentManager iPaymentManager,IMapper iMapper)
        {
            _iPaymentManager = iPaymentManager;
            _iMapper = iMapper;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var result = _iPaymentManager.GetAll();
            if (result == null)
            {
                return BadRequest(new {error = "Data Can not Found!!"});
            }

            return Ok(result);
        }
        [HttpPost("AddOrUpdate/{id:int}")]
        public IActionResult AddOrUpdate(int id,[FromBody] PaymentDto model)
        {
            if (ModelState.IsValid)
            {
                if (id > 0)
                {
                    var retriveItem = _iPaymentManager.GetById(id);
                    if (retriveItem == null)
                    {
                        return BadRequest(new { error = "Can not found Data!!" });
                    }

                    retriveItem.Amount = model.Amount;
                    var isUpdate = _iPaymentManager.Update(retriveItem);
                    if (isUpdate)
                    {
                        return Ok(retriveItem);
                    }

                    return BadRequest(new { error = "Update Failed!!" });

                }
                else
                {
                    var paymentItem = _iMapper.Map<Payment>(model);
                    var isAdded = _iPaymentManager.Add(paymentItem);
                    if (isAdded)
                    {
                        return Ok(paymentItem);
                    }

                    return BadRequest(new { error = "Failed To Add!!" });
                }
            }

            return BadRequest(new { error = "Model is not Valid!!" });

        }
    }
}
