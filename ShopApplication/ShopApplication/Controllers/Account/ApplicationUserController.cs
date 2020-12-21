using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ShopApplication.Models.UserModels;

namespace ShopApplication.Controllers.Account
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [EnableCors("CorsPolicy")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;

        public ApplicationUserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        [HttpPost]
        [Route("registration")]
        // /api/applicationUser/registration
        public async Task<object> Registration(RegistrationModel model)
        {
            var applicationUser = new ApplicationUser()
            {
                UserName =  model.UserName,
                Email = model.Email,
                PhoneNo =  model.PhoneNo
            };
            try
            {
                var result = await _userManager.CreateAsync(applicationUser, model.Password);
                
                return Ok(result);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw e;
            }
        }

    }
}
