using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Papers;

namespace Srims.Tools.DataImport.Importer.Papers
{
    public class PaperImporter : ImporterBase<Paper_Old, Paper>
    {
        protected override string EntityName
        {
            get { return "论文"; }
        }

        protected override string GetEntityDescription(Paper_Old oldEntity)
        {
            return oldEntity.Name;
        }

        protected override Paper GetNewEntity(Paper_Old oldEntity)
        {
            var paper = new Paper();

            paper.Abstract = oldEntity.Abstract;
            paper.AuthorKeyWord = oldEntity.AuthorKeyWord;
            paper.CiteFrequency = oldEntity.CiteFrequency;
            paper.College = GetNewCollegeByOld(oldEntity.CollegeID);
            paper.DocumentNumber = oldEntity.DocumentNumber;
            paper.EndPage = oldEntity.EndPage;
            paper.FirstAuthorSignUnit = (SignUnit)oldEntity.FirstAuthorSignUnit;
            paper.InfluenceFactor = getInfluenceFactor(oldEntity);
            paper.ISIUniqueArticleIdentifier = oldEntity.ISIUniqueArticleIdentifier;
            paper.KeyWord = oldEntity.KeyWord;
            paper.Lab = oldEntity.Lab;
            paper.LinkManAddress = oldEntity.LinkManAddress;
            paper.LinkManEmail = oldEntity.LinkManEmail;
            paper.LinkManSignUnit = (SignUnit)oldEntity.LinkManSignUnit;
            paper.Magazine = getMagazine(oldEntity);
            paper.Name = oldEntity.Name;
            paper.Pages = oldEntity.Pages;
            paper.PublishDate = oldEntity.PublishDate;
            paper.PublishDateYear = oldEntity.PublishDateYear;
            paper.Remark = oldEntity.Remark;
            paper.SignOrder = oldEntity.SignOrder;
            paper.StartPage = oldEntity.StartPage;
            paper.SubAirer = getSubAirer(oldEntity);
            paper.Type = (PaperType)oldEntity.Type;
            paper.Volume = oldEntity.Volume;
            paper.OldID = oldEntity.ID;

            return paper;
        }

        private Magazine getMagazine(Paper_Old oldEntity)
        {
            if (!oldEntity.MagazineID.HasValue)
                return null;

            return NewDatabase
                .Magazines
                .Single(m => m.ISSN == oldEntity.Magazine_Old.ISSN);
        }
        private int? getInfluenceFactor(Paper_Old oldEntity)
        {
            if (!oldEntity.MagazineID.HasValue)
                return null;

            var magazineInformation = NewDatabase
                .MagazineInformations
                .SingleOrDefault(mi => mi.Magazine.ISSN == oldEntity.Magazine_Old.ISSN && mi.Year == oldEntity.PublishDateYear);

            if (magazineInformation == null)
                return null;

            return magazineInformation.InfluenceFactor;
        }
        private int? getSubAirer(Paper_Old oldEntity)
        {
            if (!oldEntity.MagazineID.HasValue)
                return null;

            var magazineInformation = NewDatabase
                .MagazineInformations
                .SingleOrDefault(mi => mi.Magazine.ISSN == oldEntity.Magazine_Old.ISSN && mi.Year == oldEntity.PublishDateYear);

            if (magazineInformation == null)
                return null;

            return magazineInformation.SubAirer;
        }

    }
}
