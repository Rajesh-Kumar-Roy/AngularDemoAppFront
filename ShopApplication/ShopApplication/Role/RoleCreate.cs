using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using ShopApplication.Models.UserModels;
using System;
using System.Threading.Tasks;

namespace ShopApplication.Role
{
    public class RoleCreate
    {
        public void CreateRoles(IServiceProvider serviceProvider)
        {

            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
            Task<IdentityResult> roleResult;
            string email = "Admin@gmail.com";
            string userName = "Admin";
            string phoneNo = "01773273786";
            string managerEmail = "Manager@gmail.com";
            string managerUserName = "Manager";
            string MPhoneNo = "0172254531";

            //Check that there is an Administrator role and create if not
            Task<bool> hasAdminRole = roleManager.RoleExistsAsync("Administrator");


            hasAdminRole.Wait();



            if (!hasAdminRole.Result)
            {
                roleResult = roleManager.CreateAsync(new IdentityRole("Administrator"));
                roleResult.Wait();
            }

            Task<bool> hasUserRole = roleManager.RoleExistsAsync("User");
            hasUserRole.Wait();
            if (!hasUserRole.Result)
            {
                roleResult = roleManager.CreateAsync(new IdentityRole("User"));
                roleResult.Wait();
            }

            Task<bool> hasManagerRole = roleManager.RoleExistsAsync("Manager");
            hasManagerRole.Wait();
            if (!hasManagerRole.Result)
            {
                roleResult = roleManager.CreateAsync(new IdentityRole("Manager"));
                roleResult.Wait();
            }

            //Check if the admin user exists and create it if not
            //Add to the Administrator role

            Task<ApplicationUser> testUser = userManager.FindByEmailAsync(email);
            testUser.Wait();

            if (testUser.Result == null)
            {
                ApplicationUser administrator = new ApplicationUser();
                administrator.Email = email;
                administrator.UserName = userName;
                administrator.PhoneNo = phoneNo;

                Task<IdentityResult> newUser = userManager.CreateAsync(administrator, "12345");
                newUser.Wait();

                if (newUser.Result.Succeeded)
                {
                    Task<IdentityResult> newUserRole = userManager.AddToRoleAsync(administrator, "Administrator");
                    newUserRole.Wait();
                }
            }

            Task<ApplicationUser> MUser = userManager.FindByEmailAsync(managerEmail);
            MUser.Wait();
            if (MUser.Result == null)
            {
                ApplicationUser Manager = new ApplicationUser();
                Manager.Email = managerEmail;
                Manager.UserName = managerUserName;
                Manager.PhoneNo = MPhoneNo;
                Task<IdentityResult> newManager = userManager.CreateAsync(Manager, "12345");
                newManager.Wait();
                if (newManager.Result.Succeeded)
                {
                    Task<IdentityResult> newRoleAssign = userManager.AddToRoleAsync(Manager, "Manager");
                    newRoleAssign.Wait();
                }
            }

        }
    }
}
