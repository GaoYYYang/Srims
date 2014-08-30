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
		WHEN 2 THEN '����'
		WHEN 3 THEN '����'
		WHEN 4 THEN '����'
		WHEN 5 THEN 'ʵ��'
		WHEN 6 THEN '��Ϊ����'
		WHEN 7 THEN '����'
		WHEN 8 THEN '��Ȩ'
		WHEN 9 THEN 'ר��Ȩ����'
		WHEN 10 THEN 'ר��Ȩ�ָ�'
		WHEN 11 THEN 'ר��Ȩ��ֹ'
		ELSE 'δ֪'
	END

	RETURN @Result
END
GO

