using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

using Srims.Server.Business.Common;

namespace Srims.Tools.DataUpdate.Updaters
{
    public class ResourceUpdater : UpdaterBase<Resource>
    {
        private string _OutputPath;

        public ResourceUpdater(string outputPath)
        {
            this._OutputPath = outputPath;
        }

        protected override string EntityName
        {
            get { return "资源"; }
        }

        protected override string GetEntityDescription(Resource entity)
        {
            return entity.Guid.ToString();
        }

        protected override IQueryable<Resource> GetOldEntities()
        {
            return Database.Resources;
        }

        protected override void UpdateAction(Resource entity)
        {
            File.WriteAllBytes(String.Format(@"{0}\{1}.{2}", _OutputPath, entity.Guid, entity.Type), entity.Content);

            //resource.Content = null;
            //resource.Save(database);
        }
    }
}
