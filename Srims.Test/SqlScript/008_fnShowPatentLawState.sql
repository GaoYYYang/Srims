IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fnShowPatentLawState]') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT'))
DROP FUNCTION [dbo].[fnShowPatentLawState]
GO

CREATE FUNCTION fnShowPatentLawState 
(
	@PatentLawState int
)
RETURNS nvarchar(255)
AS
BEGIN
	DECLARE @Result nvarchar(255)

	SELECT @Result = CASE @PatentLawState		
		WHEN 1 THEN 'PCT'
		WHEN 2 THEN '驳回'
		WHEN 3 THEN '撤回'
		WHEN 4 THEN '公开'
		WHEN 5 THEN '实审'
		WHEN 6 THEN '视为撤回'
		WHEN 7 THEN '受理'
		WHEN 8 THEN '授权'
		WHEN 9 THEN '专利权放弃'
		WHEN 10 THEN '专利权恢复'
		WHEN 11 THEN '专利权终止'
		ELSE '未知'
	END

	RETURN @Result
END
GO

