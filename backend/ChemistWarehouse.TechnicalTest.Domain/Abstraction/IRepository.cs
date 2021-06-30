using System.Collections.Generic;
using System.Threading.Tasks;
using ChemistWarehouse.TechnicalTest.Common;

namespace ChemistWarehouse.TechnicalTest.Domain.Abstraction
{
    public interface IRepository<TEntity> 
        where TEntity: class, IEntity
    {
        Task<TEntity> GetByIdAsync(int id);
        Task<List<TEntity>> GetListAsync(int startIndex, int pageSize, string sortBy, SortDirection sortDirection);
        Task<int> GetCountAsync();
        Task<TEntity> InsertAsync(TEntity entity);
        Task<TEntity> UpdateAsync(TEntity entity);
        Task DeleteAsync(TEntity entity);
    }
}
