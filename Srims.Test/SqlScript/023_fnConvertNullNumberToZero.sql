IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fnConvertNullNumberToZero]') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT'))
DROP FUNCTION [dbo].[fnConvertNullNumberToZero]
GO

CREATE FUNCTION [fnConvertNullNumberToZero](@Number bigint) 
	RETURNS bigint
AS
	BEGIN
		RETURN CASE 
			WHEN @Number is NULL THEN 0
			ELSE @Number
		END
	END
GO
