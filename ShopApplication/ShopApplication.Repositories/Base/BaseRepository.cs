using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using Microsoft.EntityFrameworkCore;
using ShopApplication.Repositories.IRContracts;

namespace ShopApplication.Repositories.Base
{
    public class BaseRepository<T>:IBaseRepository<T> where T:class
    {
        private Microsoft.EntityFrameworkCore.DbContext db;
        public BaseRepository(Microsoft.EntityFrameworkCore.DbContext db)
        {
            this.db = db;
        }

        public DbSet<T> Table
        {
            get { return db.Set<T>(); }
        }
        public bool Add(T entity)
        {
            Table.Add(entity);
            return db.SaveChanges() > 0;
        }

        public bool Update(T entity)
        {
            db.Entry(entity).State = EntityState.Modified;
            return db.SaveChanges() > 0;
        }

        public bool Remove(T entity)
        {
            Table.Remove(entity);
            return db.SaveChanges() > 0;
        }

        public T GetById(int? id)
        {
            return Table.Find(id);

        }

        public ICollection<T> GetAll()
        {
            return Table.ToList();
        }

        public ICollection<T> Get( T instance, Expression<Func<T, object>> expression)
        {

            return Table.Where(c=>c.Equals(expression.Name)).ToList();
        }
    }
}
