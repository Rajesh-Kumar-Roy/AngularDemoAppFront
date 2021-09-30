using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ShopApplication.Models.UserModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopApplication.Controllers.Account.Management
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        public readonly RoleManager<IdentityRole> _roleManager;
        public AdminController(RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
        }
        [HttpPost("Role")]
        public async Task<IActionResult> CreateRole([FromBody] CreateRoleDto model)
        {
            if (ModelState.IsValid)
            {
                IdentityRole identityRole = new IdentityRole
                {
                    Name = model.RoleName
                };
                IdentityResult result = await _roleManager.CreateAsync(identityRole);
                if (result.Succeeded)
                {
                    return Ok(identityRole);
                }
                else
                {
                    foreach (IdentityError error in result.Errors)
                    {
                        return BadRequest(new { error = "Failed To Add!" });
                    }
                }
            }
            return BadRequest(new { error = "Model Sate is Not Valid! " });
        }
    }
}
