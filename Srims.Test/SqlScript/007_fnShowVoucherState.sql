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
		WHEN 1 THEN 'δ��ӡ'
		WHEN 2 THEN '�Ѵ�ӡ/δǩ��'
		WHEN 3 THEN 'ǩ��/δ����'
		WHEN 4 THEN '�ѷ���'
		ELSE 'δ֪'
	END

	RETURN @Result
END
GO

