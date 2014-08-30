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
		WHEN 1 THEN '�ȴ�ר���ύ������Ϣ'
		WHEN 2 THEN '�ȴ��������'
		WHEN 4 THEN '��Ŀ����'
		WHEN 5 THEN '�ȴ��������'
		WHEN 6 THEN '�ѽ���'
		WHEN 7 THEN '�ѱ�ɾ��'
		WHEN 8 THEN '����'
		WHEN 9 THEN '��ֹ'
		ELSE 'δ֪'
	END

	RETURN @Result
END
GO

