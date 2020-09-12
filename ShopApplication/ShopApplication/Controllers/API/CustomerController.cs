using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopApplication.Manager.IMContract;
using ShopApplication.Models.DtoModels.CustomerDto;
using ShopApplication.Models.EntityModels.Customers;
using ShopApplication.UtilityManager;

namespace ShopApplication.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private ICustomerManager _repository;
        private IMapper _iMapper;
        public CustomerController(ICustomerManager repository,IMapper iMapper)
        {
            _repository = repository;
            _iMapper = iMapper;
        }
        [HttpGet]
        public IActionResult Get()
        {


            var customer = _repository.GetAll();
            if (customer == null)
            {
                return BadRequest(new { error = "Empty Customer!" });
            }
            return Ok(customer);
        }

        [HttpPost]
        public IActionResult Post([FromBody] CustomerDto model)
        {
            if (ModelState.IsValid)
            {
                var customer = _iMapper.Map<Customer>(model);
                customer.CustomerCode = Uitlity.GetCustomerCode();
                bool isAdded = _repository.Add(customer);
                if (isAdded)
                {
                    return Ok(customer);
                }

                return BadRequest(new { error = "Failed to Add!" });
            }

            return BadRequest(new { error = "Model Sate is Not Valid! " });
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var customer = _repository.GetById(id);
            if (customer == null)
            {
                return BadRequest(new { error = "Can not Get product!" });
            }

            return Ok(customer);
        }


        [HttpGet("GetNameByCustomerCode/{customerCode}")]
        public IActionResult GetNameByCustomerCode(string customerCode)
        {
            var customer = _repository.GetNameByCustomerCode(customerCode);


            if (customer == null)
            {
                return BadRequest(new { error = "Can not Get product!" });
            }

            return Ok(customer);


        }




        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Customer customer)
        {
            var retriveCustomer = _repository.GetById(id);
            if (retriveCustomer == null)
            {
                return BadRequest(new { error = "product not Found!" });
            }

            retriveCustomer.FirstName = customer.FirstName;
            retriveCustomer.LastName = customer.LastName;
            retriveCustomer.Address = customer.Address;
            retriveCustomer.Email = customer.Email;
            retriveCustomer.MobileNo = customer.MobileNo;
           // retriveCustomer.CustomerCode = retriveCustomer.CustomerCode;
            bool isUpdate = _repository.Update(retriveCustomer);
            if (isUpdate)
            {
                return Ok(retriveCustomer);
            }

            return BadRequest(new { error = "Failed!" });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var retriveCustomer = _repository.GetById(id);
            if (retriveCustomer == null)
            {
                return BadRequest(new { error = "Customer not Found!" });
            }

            bool isDelete = _repository.Remove(retriveCustomer, true);
            if (isDelete)
            {
                return Ok(retriveCustomer);
            }

            return BadRequest(new { error = "Failed To Delete!" });
        }


    }
}
