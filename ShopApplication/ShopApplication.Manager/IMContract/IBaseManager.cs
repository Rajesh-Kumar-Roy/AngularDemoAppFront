using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace ShopApplication.Manager.IMContract
{
    public interface IBaseManager<T> where T: class
    {
        bool Add(T entity);
        bool Update(T entity);
        bool Remove(T entity);
        T GetById(int? id);
        ICollection<T> GetAll();
        ICollection<T> Get(T instance, Expression<Func<T, object>> expression);
    }
}
