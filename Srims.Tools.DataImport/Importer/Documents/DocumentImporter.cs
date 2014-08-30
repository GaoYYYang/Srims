using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business;
using Srims.Server.Business.Common;
using Srims.Server.Business.Documents;

namespace Srims.Tools.DataImport.Importer.Documents
{
    public class DocumentImporter : ImporterBase<Document_Old, Document>
    {
        protected override string EntityName
        {
            get { return "项目文档"; }
        }

        protected override string GetEntityDescription(Document_Old oldEntity)
        {
            return String.Format(@"{0} - {1}", oldEntity.Project_Old.Name, oldEntity.Name);
        }

        protected override string ResourceColumn
        {
            get { return "DocumentResource"; }
        }

        protected override Document GetNewEntity(Document_Old oldEntity)
        {
            var document = new Document();
            var oldDatebase = new SrimsV4DataContext(OldDatabaseConnectionString);
            var oldDocument = oldDatebase.Document_Olds.Single(d => d.ID == oldEntity.ID);

            document.Author = oldDocument.Author;
            document.Censor = oldDocument.Censor;
            document.CensorDateTime = oldDocument.CensorDateTime;
            document.DocumentResource = getResource(oldDocument);
            document.Deadline = oldDocument.SubmitEndDateTime;
            document.IsRequire = oldDocument.IsRequire;
            document.Name = oldDocument.Name;
            document.Project = GetNewProjectByOld(oldDocument.ProjectID);
            document.State = (CensorState)oldDocument.State;
            document.SubmitDateTime = oldDocument.SubmitDateTime;

            oldDatebase.Dispose();
            oldDatebase = null;
            System.GC.Collect();

            return document;
        }

        private Guid? getResource(Document_Old oldEntity)
        {
            if (oldEntity.Content == null)
                return null;

            var resource = new Resource();
            resource.Content = oldEntity.Content;
            resource.Guid = Guid.NewGuid();
            resource.Type = oldEntity.FileType;
            resource.Save(NewDatabase);

            return resource.Guid;
        }
    }
}
