using System;
using System.Collections.Generic;

namespace ChemistWarehouse.TechnicalTest.Common
{
    public class PagedResult<T>
    {
        public List<T> Items { get; set; }
        public int TotalCount { get; set; }
    }
}
