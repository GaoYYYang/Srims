IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fnShowFundDescendState]') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT'))
DROP FUNCTION [dbo].[fnShowFundDescendState]
GO

CREATE FUNCTION fnShowFundDescendState 
(
	@FundDescendState  int
)
RETURNS nvarchar(255)
AS
BEGIN
	DECLARE @Result nvarchar(255)

	SELECT @Result = CASE @FundDescendState
		WHEN 2 THEN '�ȴ����'
		WHEN 3 THEN '����'
		WHEN 4 THEN 'ͨ��'
		WHEN 5 THEN '�������'
		ELSE 'δ֪'
	END

	RETURN @Result
END
GO

