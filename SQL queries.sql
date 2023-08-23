CREATE SCHEMA `Employee`;

CREATE TABLE `Employee`.`Employee Details`(`EmpId` INT NOT NULL, `FirstName` VARCHAR(100) NULL, `LastName` VARCHAR(100) NULL, `Salary` INT NULL, PRIMARY KEY (`EmpId`));

INSERT INTO `Employee`.`Employee Details`(`EmpId`,`FirstName`,`LastName`,`Salary`) VALUE("1","Jim","Halpert","100000");
INSERT INTO `Employee`.`Employee Details`(`EmpId`,`FirstName`,`LastName`,`Salary`) VALUE("2","Kelly","Kapoor","50000");
INSERT INTO `Employee`.`Employee Details`(`EmpId`,`FirstName`,`LastName`,`Salary`) VALUE("3","Saul","Goodman","95000");




