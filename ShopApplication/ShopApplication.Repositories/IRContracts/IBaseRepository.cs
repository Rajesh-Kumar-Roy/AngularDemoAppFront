using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace ShopApplication.Repositories.IRContracts
{
    public interface IBaseRepository<T> : IDisposable where T : class
    {
        DbContext Db { get; set; }
        DbSet<T> Table { get; }
        bool Add(T entity);
        bool Update(T entity);
        bool Remove(T entity, bool isRemove);
        T GetById(int id);
        ICollection<T> GetAll();
        ICollection<T> Get(Expression<Func<T, bool>> predicate, bool isTracking = true);
        ICollection<T> Get(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes);

        ICollection<T> Get(Expression<Func<T, bool>> predicate, bool isTracking = true,
            params Expression<Func<T, object>>[] includes);
    }
}
