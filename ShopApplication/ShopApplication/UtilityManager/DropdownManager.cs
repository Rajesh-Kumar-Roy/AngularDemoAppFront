using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using ShopApplication.Manager.IMContract;

namespace ShopApplication.UtilityManager
{
    public class DropdownManager:IDropdownManager
    {
        private IProductTypeManager _iProductTypeManager;

        public DropdownManager(IProductTypeManager iProductTypeManager)
        {
            _iProductTypeManager = iProductTypeManager;
        }
        public ICollection<SelectListItem> GetProductTypeLookUpData()
        {
            return _iProductTypeManager.GetAll().Select(c=>new SelectListItem()
            {
                Value = c.Id.ToString(),
                Text = c.Name
            }).ToList();
        }
    }
}
