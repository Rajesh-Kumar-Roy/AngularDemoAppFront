using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ShopApplication.Manager.IMContract;
using ShopApplication.Models.DtoModels.PaymentDto;
using ShopApplication.Models.EntityModels.PaymentModels;

namespace ShopApplication.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class MobileBankingTypeController : ControllerBase
    {
        private IMobileBankingTypeManager _iMobileBankingTypeManager;
        private IMapper _iMapper;
        public MobileBankingTypeController(IMobileBankingTypeManager iMobileBankingTypeManager, IMapper iMapper)
        {
            _iMobileBankingTypeManager = iMobileBankingTypeManager;
            _iMapper = iMapper;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var item = _iMobileBankingTypeManager.GetById(id);
            if (item == null)
            {
                return BadRequest(new { error = "Can not Found Data!!" });
            }

            return Ok(item);
        }
        [HttpPost("AddOrUpdate/{id:int}")]
        public IActionResult AddOrUpdate(int id, [FromBody] MobileBankingTypeDto model)
        {
            if (ModelState.IsValid)
            {
                if (id > 0)
                {
                    var retriveItem = _iMobileBankingTypeManager.GetById(id);
                    if (retriveItem == null)
                    {
                        return BadRequest(new { error = "Can not found Data!!" });
                    }

                    retriveItem.Name = model.Name;
                    retriveItem.Description = model.Description;
                    retriveItem.IsDelete = model.IsDelete;
                    var isUpdate = _iMobileBankingTypeManager.Update(retriveItem);
                    if (isUpdate)
                    {
                        return Ok(retriveItem);
                    }

                    return BadRequest(new { error = "Update Failed!!" });

                }
                else
                {
                    var mobileBankingTypeItem = _iMapper.Map<MobileBankingType>(model);
                    var isAdded = _iMobileBankingTypeManager.Add(mobileBankingTypeItem);
                    if (isAdded)
                    {
                        return Ok(mobileBankingTypeItem);
                    }

                    return BadRequest(new { error = "Failed To Add!!" });
                }
            }

            return BadRequest(new { error = "Model is not Valid!!" });

        }

        [HttpGet("GetAllFalse")]
        public IActionResult GetAllFalseData()
        {
            var items = _iMobileBankingTypeManager.GetAllFalse();
            if (items == null)
            {
                return BadRequest(new { error = "Can not Find any Data!!" });
            }

            return Ok(items);
        }
        //
        // [HttpPut]
        // public IActionResult Put(int id, [FromBody] MobileBankingTypeDto model)
        // {
        //
        // }
    }
}
