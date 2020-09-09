using ShopApplication.Manager.IMContract;
using ShopApplication.Repositories.IRContracts;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace ShopApplication.Manager.Base
{
    public class BaseManager<T> : IBaseManager<T> where T : class
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

        public bool Remove(T entity, bool isRemove)
        {
            return _iBaseRepository.Remove(entity, isRemove);
        }

        public T GetById(int id)
        {
            return _iBaseRepository.GetById(id);
        }

        public ICollection<T> GetAll()
        {
            return _iBaseRepository.GetAll();
        }

        public ICollection<T> Get(Expression<Func<T, bool>> predicate, bool isTracking = true)
        {
            return _iBaseRepository.Get(predicate, isTracking);
        }

        public ICollection<T> Get(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes)
        {
            return _iBaseRepository.Get(predicate, includes);
        }

        public ICollection<T> Get(Expression<Func<T, bool>> predicate, bool isTracking = true, params Expression<Func<T, object>>[] includes)
        {
            return _iBaseRepository.Get(predicate, isTracking, includes);
        }

    }
}
