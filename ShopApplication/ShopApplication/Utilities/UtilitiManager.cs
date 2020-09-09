    using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Rendering;
using ShopApplication.Manager.IMContract;

namespace ShopApplication.Utilities
{
    public class UtilitiManager:IUtilitiManager
    {
        private IProductTypeManager _productTypeManager;

        public UtilitiManager(IProductTypeManager productTypeManager)
        {
            _productTypeManager = productTypeManager;
        }
        public ICollection<SelectListItem> GetProductTypeLookUpData()
        {
            return _productTypeManager.GetAll().Select(c=>new SelectListItem()
            {
                Value = c.Id.ToString(),
                Text = c.Name
            }).ToList();
        }
    }
}
