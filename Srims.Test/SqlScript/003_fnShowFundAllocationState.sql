IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fnShowFundAllocationState]') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT'))
DROP FUNCTION [dbo].[fnShowFundAllocationState]
GO

CREATE FUNCTION fnShowFundAllocationState 
(
	@FundAllocationState  int
)
RETURNS nvarchar(255)
AS
BEGIN
	DECLARE @Result nvarchar(255)

	SELECT @Result = CASE @FundAllocationState
		WHEN 1 THEN '未提交/正在分配'
		WHEN 2 THEN '等待审核'
		WHEN 3 THEN '驳回'
		WHEN 4 THEN '通过'
		WHEN 5 THEN '作废'
		ELSE '未知'
	END

	RETURN @Result
END
GO

