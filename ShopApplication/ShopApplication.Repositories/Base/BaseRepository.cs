using Microsoft.EntityFrameworkCore;
using ShopApplication.Repositories.IRContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using ShopApplication.Models.ModelContracts;

namespace ShopApplication.Repositories.Base
{
    public abstract class BaseRepository<T> : IBaseRepository<T> where T : class, IEntity, IDelete
    {
        public DbContext Db { get; set; }
        protected BaseRepository(DbContext db)
        {
            this.Db = db;
        }

        public DbSet<T> Table => Db.Set<T>();

        public virtual bool Add(T entity)
        {
            Table.Add(entity);
            return Db.SaveChanges() > 0;
        }

        public virtual bool Update(T entity)
        {
            Db.Entry(entity).State = EntityState.Modified;
            return Db.SaveChanges() > 0;
        }

        public virtual bool Remove(T entity, bool isRemove)
        {
            if (entity == null) { return false; }
            if (isRemove)
            { Table.Remove(entity); return Db.SaveChanges() > 0; }
            if (entity.IsDelete) { Update(entity); }

            return false;

        }


        public virtual T GetById(int id)
        {
            return Table.FirstOrDefault(c => c.Id == id);

        }

        public virtual ICollection<T> GetAll()
        {
            return Table.ToList();
        }


        public virtual ICollection<T> Get(Expression<Func<T, bool>> predicate, bool isTracking = true)
        {
            return isTracking ? Table.Where(predicate).ToList() : Table.Where(predicate).AsNoTracking().ToList();
        }

        public virtual ICollection<T> Get(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes)
        {
            if (includes == null || !includes.Any())
            {
                return Get(predicate);
            }

            var result = includes.Aggregate(Table.AsQueryable(), (current, include) => current.Include(include), c => c.Where(predicate)).ToList();

            return result;
        }
        public virtual ICollection<T> Get(Expression<Func<T, bool>> predicate, bool isTracking = true, params Expression<Func<T, object>>[] includes)
        {
            if (includes == null || !includes.Any())
            {
                return Get(predicate, isTracking);
            }
            var result = isTracking ? includes.Aggregate(Table.AsQueryable(), (current, include) => current.Include(include), c => c.Where(predicate)).ToList() : includes.Aggregate(Table.AsQueryable(), (current, include) => current.Include(include), c => c.Where(predicate)).AsNoTracking().ToList();
            return result;
        }

        public virtual void Dispose()
        {
            Db.Dispose();
        }
    }
}
