using System;
using System.Collections.Generic;
using System.Text;

namespace ChemistWarehouse.TechnicalTest.Application.Exceptions
{
    public class EntityNotFoundException : Exception
    {
        public EntityNotFoundException(string entityType, int entityId) : 
            base($"{entityType} with ID {entityId} cannot be found")
        {
        }
    }
}
