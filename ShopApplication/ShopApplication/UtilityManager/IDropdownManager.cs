using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace ShopApplication.UtilityManager
{
    public interface IDropdownManager
    {
        ICollection<SelectListItem> GetProductTypeLookUpData();
    }
}
