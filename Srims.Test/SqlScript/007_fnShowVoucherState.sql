IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fnShowVoucherState]') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT'))
DROP FUNCTION [dbo].[fnShowVoucherState]
GO

CREATE FUNCTION fnShowVoucherState 
(
	@VoucherState int
)
RETURNS nvarchar(255)
AS
BEGIN
	DECLARE @Result nvarchar(255)

	SELECT @Result = CASE @VoucherState		
		WHEN 1 THEN '未打印'
		WHEN 2 THEN '已打印/未签收'
		WHEN 3 THEN '签收/未分配'
		WHEN 4 THEN '已分配'
		ELSE '未知'
	END

	RETURN @Result
END
GO

