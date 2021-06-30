using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ChemistWarehouse.TechnicalTest.Common;
using ChemistWarehouse.TechnicalTest.Domain.Abstraction;
using Microsoft.EntityFrameworkCore;

namespace ChemistWarehouse.TechnicalTest.EntityFramework.Repositories
{
    public abstract class EfRepositoryBase<TEntity> : IRepository<TEntity> where TEntity : class, IEntity
    {
        protected readonly ChemistWarehouseDbContext Context;

        protected EfRepositoryBase(ChemistWarehouseDbContext context)
        {
            Context = context;
        }

        public async Task<TEntity> GetByIdAsync(int id)
        {
            return await Context.Set<TEntity>().SingleOrDefaultAsync(e => e.Id == id);
        }

        public async Task<List<TEntity>> GetListAsync(int startIndex, int pageSize, string sortBy, SortDirection sortDirection)
        {
            var query = Context.Set<TEntity>().AsQueryable();

            query = sortDirection == SortDirection.Asc ? 
                query.OrderBy(e => EF.Property<TEntity>(e, sortBy)) : 
                query.OrderByDescending(e => EF.Property<TEntity>(e, sortBy));

            return await query.Skip(startIndex)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<int> GetCountAsync()
        {
            return await Context.Set<TEntity>().CountAsync();
        }

        public async Task<TEntity> InsertAsync(TEntity entity)
        {
            var inserted = await Context.AddAsync(entity);
            await Context.SaveChangesAsync();
            return inserted.Entity;
        }

        public async Task<TEntity> UpdateAsync(TEntity entity)
        {
            Context.Set<TEntity>().Update(entity);
            await Context.SaveChangesAsync();
            return entity;
        }

        public async Task DeleteAsync(TEntity entity)
        {
            Context.Remove(entity);
            await Context.SaveChangesAsync();
        }
    }
}
