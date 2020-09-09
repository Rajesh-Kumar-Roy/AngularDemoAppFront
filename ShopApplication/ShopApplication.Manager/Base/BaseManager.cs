using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using ShopApplication.Manager.IMContract;
using ShopApplication.Repositories.IRContracts;

namespace ShopApplication.Manager.Base
{
    public class BaseManager<T>:IBaseManager<T> where T:class
    {
        private readonly IBaseRepository<T> _iBaseRepository;
        public BaseManager(IBaseRepository<T> iBaseRepository)
        {
            _iBaseRepository = iBaseRepository;
        }
        public bool Add(T entity)
        {
            return _iBaseRepository.Add(entity);
        }

        public bool Update(T entity)
        {
            return _iBaseRepository.Update(entity);
        }

        public bool Remove(T entity)
        {
            return _iBaseRepository.Remove(entity);
        }

        public T GetById(int? id)
        {
            return _iBaseRepository.GetById(id);
        }

        public ICollection<T> GetAll()
        {
            return _iBaseRepository.GetAll();
        }

        public ICollection<T> Get(T instance, Expression<Func<T, object>> expression)
        {;
            return _iBaseRepository.Get(instance, expression);
        }
    }
}
