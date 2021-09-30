using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ShopApplication.Models.UserModels
{
    public class CreateRoleDto
    {
        [Required]
        public string RoleName { get; set; }
    }
}
