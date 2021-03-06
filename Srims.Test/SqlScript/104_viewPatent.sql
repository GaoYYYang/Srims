IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[viewPatent]'))
DROP VIEW [dbo].[viewPatent]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[viewPatent]
AS

SELECT 
	Patent.ID AS ID,
	Patent.Number AS Number,
	Patent.Name AS Name,
	Patent.ApplicationDateTime AS ApplicationDateTime,
	Patent.AuthorizeDateTime AS AuthorizeDateTime,
	Patent.LawState AS LawStateValue,
	dbo.fnShowPatentLawState(Patent.LawState) AS LawState,
	Patent.LawStateTime AS LawStateTime,
	Patent.Country AS Country,
	Patent.Category AS Category,
	Patent.MainCategoryNumber AS MainCategoryNumber,
	Patent.AllCategoryNumber AS AllCategoryNumber,
	Patent.Type AS TypeValue,
	dbo.fnShowPatentType(Patent.Type) AS [Type],
	Patent.Level AS LevelValue,
	dbo.fnShowPatentLevel(Patent.Level) AS [Level],
	Patent.Introduction AS Introduction,
	Patent.Remark AS Remark,
	Patent.Agent AS Agent,

	College.ID AS CollegeID,
	College.Name AS CollegeName,

	Agency.ID AS AgencyID,
	Agency.Name AS AgencyName,

	Principal.ID AS PrincipalID,
	Principal.Name AS PrincipalName,
	Principal.[Order] AS PrincipalOrder,

	PrincipalExpert.ID AS PrincipalExpertID,
	PrincipalExpert.Number AS PrincipalExpertNumber,
	PrincipalExpert.NameSpell AS PrincipalExpertNameSpell,

	PrincipalCollege.ID AS PrincipalCollegeID,
	PrincipalCollege.Name AS PrincipalCollegeName

FROM         
	Patent AS Patent

	LEFT OUTER JOIN Department AS College ON Patent.CollegeID = College.ID
	LEFT OUTER JOIN PatentAgency AS Agency ON Patent.AgencyID = Agency.ID

	LEFT OUTER JOIN PatentInventer AS Principal ON Patent.ID = Principal.PatentID AND Principal.IsPrincipal = 1
	LEFT OUTER JOIN Expert AS PrincipalExpert ON PrincipalExpert.ID = Principal.ExpertID
	LEFT OUTER JOIN Department AS PrincipalCollege ON PrincipalCollege.ID = PrincipalExpert.CollegeID

GO