using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace ShopApplication.Utilities
{
    public interface IUtilitiManager
    {
        ICollection<SelectListItem> GetProductTypeLookUpData();
    }
}
