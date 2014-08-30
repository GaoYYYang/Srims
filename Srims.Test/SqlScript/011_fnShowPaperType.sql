IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fnShowPaperType]') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT'))
DROP FUNCTION [dbo].[fnShowPaperType]
GO

CREATE FUNCTION fnShowPaperType 
(
	@PaperType int
)
RETURNS nvarchar(255)
AS
BEGIN
	DECLARE @Result nvarchar(255)

	SELECT @Result = CASE @PaperType		
		WHEN 1 THEN '文章'
		WHEN 2 THEN '修正'
		WHEN 3 THEN '编辑材料'
		WHEN 4 THEN '文字'
		WHEN 5 THEN '会议摘要'
		WHEN 6 THEN '笔记'
		WHEN 7 THEN '回顾'
		ELSE '未知'
	END

	RETURN @Result
END
GO

