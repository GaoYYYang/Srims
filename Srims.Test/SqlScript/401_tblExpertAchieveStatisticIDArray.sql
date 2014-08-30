IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ExpertAchieveStatisticIDArray]') AND type in (N'U'))
DROP TABLE [dbo].[ExpertAchieveStatisticIDArray]

CREATE TABLE [dbo].[ExpertAchieveStatisticIDArray](
	[ID] [int] NOT NULL,
	[Type] [int] NOT NULL
) ON [PRIMARY]
