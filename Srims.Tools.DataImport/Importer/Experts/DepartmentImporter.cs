using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common;

using Srims.Server.Business.Experts;

namespace Srims.Tools.DataImport.Importer.Experts
{
    public class DepartmentImporter : ImporterBase<Department_Old, Department>
    {
        protected override string EntityName
        {
            get { return "部门"; }
        }

        protected override string GetEntityDescription(Department_Old oldEntity)
        {
            return oldEntity.Name;
        }

        protected override Department GetNewEntity(Department_Old oldEntity)
        {
            var department = new Department();

            department.Code = oldEntity.Code;
            department.Name = oldEntity.Name;
            department.NameSpell = Spell.GetSpell(oldEntity.Name);
            department.ShortName = oldEntity.ShortName;
            department.IsCollege = oldEntity.IsCollege;

            return department;
        }
    }
}
