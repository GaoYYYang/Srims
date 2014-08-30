--提示问题：盖章材料类型
DELETE FROM NoticeText WHERE Type = 34;
INSERT INTO NoticeText(Value, ValueSpell, Type) VALUES('项目申请书', 'XMSQS', 34);
INSERT INTO NoticeText(Value, ValueSpell, Type) VALUES('合同书', 'HTS', 34);
INSERT INTO NoticeText(Value, ValueSpell, Type) VALUES('进展报告', 'JZBG', 34);
INSERT INTO NoticeText(Value, ValueSpell, Type) VALUES('结题报告', 'JTBG', 34);
INSERT INTO NoticeText(Value, ValueSpell, Type) VALUES('预算申报书', 'YSSBS', 34);
INSERT INTO NoticeText(Value, ValueSpell, Type) VALUES('预算书', 'YSS', 34);
INSERT INTO NoticeText(Value, ValueSpell, Type) VALUES('年度决算', 'NDJS', 34);
INSERT INTO NoticeText(Value, ValueSpell, Type) VALUES('经费决算', 'JFJS', 34);
INSERT INTO NoticeText(Value, ValueSpell, Type) VALUES('公文', 'GW', 34);
INSERT INTO NoticeText(Value, ValueSpell, Type) VALUES('函', 'H', 34);
INSERT INTO NoticeText(Value, ValueSpell, Type) VALUES('说明', 'SM', 34);
INSERT INTO NoticeText(Value, ValueSpell, Type) VALUES('其他', 'QT', 34);

--提示文本：盖章是由
DELETE FROM NoticeText WHERE Type = 32;
INSERT INTO NoticeText(Value, ValueSpell, Type) VALUES('项目申请', 'XMSQ', 32);
INSERT INTO NoticeText(Value, ValueSpell, Type) VALUES('项目结题', 'XMJT', 32);
INSERT INTO NoticeText(Value, ValueSpell, Type) VALUES('其他', 'QT', 32);

--盖章类型
DECLARE @adminID int;
SET @adminID = (SELECT TOP 1 ID FROM [User] WHERE IsSuper = 1 AND [LoginID] = 'admin');

DELETE FROM Stamp;
INSERT INTO Stamp(Type, OwnerID, IsDelete) VALUES('校长签名章', @adminID, 0);
INSERT INTO Stamp(Type, OwnerID, IsDelete) VALUES('学校公章', @adminID, 0);
INSERT INTO Stamp(Type, OwnerID, IsDelete) VALUES('法人证书复印件', @adminID, 0);
INSERT INTO Stamp(Type, OwnerID, IsDelete) VALUES('单位组织代码证', @adminID, 0);

--删除非SCI收录论文
DELETE FROM PaperIndexed WHERE Indexed NOT IN (1, 2, 3);
DELETE FROM PaperAuthor WHERE NOT EXISTS 
	(
		SELECT *
		FROM PaperIndexed
		WHERE PaperIndexed.PaperID = PaperAuthor.PaperID
	);
DELETE FROM Paper WHERE NOT EXISTS 
	(
		SELECT *
		FROM PaperIndexed
		WHERE PaperIndexed.PaperID = Paper.ID
	);