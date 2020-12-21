using Microsoft.AspNetCore.Identity;

namespace ShopApplication.Models.UserModels
{
    public class ApplicationUser: IdentityUser
    {
        public string PhoneNo { get; set; }
    }
}
