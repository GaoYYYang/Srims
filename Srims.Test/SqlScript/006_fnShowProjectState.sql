IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fnShowProjectState]') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT'))
DROP FUNCTION [dbo].[fnShowProjectState]
GO

CREATE FUNCTION fnShowProjectState 
(
	@ProjectState int
)
RETURNS nvarchar(255)
AS
BEGIN
	DECLARE @Result nvarchar(255)

	SELECT @Result = CASE @ProjectState		
		WHEN 1 THEN '等待专家提交立项信息'
		WHEN 2 THEN '等待立项审核'
		WHEN 4 THEN '项目在研'
		WHEN 5 THEN '等待结项审核'
		WHEN 6 THEN '已结项'
		WHEN 7 THEN '已被删除'
		WHEN 8 THEN '撤销'
		WHEN 9 THEN '终止'
		ELSE '未知'
	END

	RETURN @Result
END
GO

