const mysql = require('mysql2');
const config = require('../config');
const connection = mysql.createConnection(config.mysqlConfig.mysql);

console.log('Running Migration');

connection.connect(err => {
    if (err) throw err;
    console.log('DataBase Connected');
})

const creatAMS =
    `CREATE DATABASE IF NOT EXISTS ams`;

connection.query(creatAMS, function (err, result) {
    if (err) throw err;
});

const createInstitution =
    `CREATE TABLE IF NOT EXISTS ams.institution (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    address VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    createdByUserId INT NOT NULL,
    PRIMARY KEY (id, email))
  ENGINE = InnoDB;`

connection.query(createInstitution, function (err, result) {
    if (err) throw err;
});

const user =
    `CREATE TABLE IF NOT EXISTS ams.user (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL,
    phonenumber INT,
    age TINYINT(10),
    address VARCHAR(45),
    gender TINYINT(10),
    PRIMARY KEY (id, email))
  ENGINE = InnoDB;`

connection.query(user, function (err, result) {
    if (err) throw err;
});

const institutionUserMapping = `CREATE TABLE IF NOT EXISTS ams.institutionusermapping (
    id INT NOT NULL AUTO_INCREMENT,
    institutionid INT NOT NULL,
    userid INT NOT NULL,
    PRIMARY KEY (id),
    INDEX institutionid_idx (institutionid ASC),
    INDEX userid_idx (userid ASC),
    CONSTRAINT instituteuser_fk1
      FOREIGN KEY (institutionid)
      REFERENCES ams.institution (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION,
    CONSTRAINT user_fk2
      FOREIGN KEY (userid)
      REFERENCES ams.user (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION)
  ENGINE = InnoDB;`

connection.query(institutionUserMapping, function (err, result) {
    if (err) throw err;
});

const createAdmin = `CREATE TABLE IF NOT EXISTS ams.admin (
    id INT NOT NULL ,
    userid INT NOT NULL,
    institutionid INT NOT NULL,
    PRIMARY KEY (id),
    INDEX institutionid_idx (institutionid ASC),
    CONSTRAINT admin_fk1
      FOREIGN KEY (institutionid)
      REFERENCES ams.institution (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION,
    CONSTRAINT admin_fk2
      FOREIGN KEY (userid)
      REFERENCES ams.user (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION)
  ENGINE = InnoDB;
  `
connection.query(createAdmin, function (err, result) {
    if (err) throw err;
})


const createClass = `CREATE TABLE IF NOT EXISTS ams.class (
    id INT NOT NULL AUTO_INCREMENT,
    institutionid INT NOT NULL,
    name VARCHAR(45) NOT NULL,
    year INT NOT NULL,
    PRIMARY KEY (id),
    INDEX institutionid_idx (institutionid ASC),
    CONSTRAINT class_fk1
      FOREIGN KEY (institutionid)
      REFERENCES ams.institution (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION)
  ENGINE = InnoDB;`

connection.query(createClass, function (err, result) {
    if (err) throw err;
});

const createSubject = `CREATE TABLE IF NOT EXISTS ams.subject (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    classid INT NOT NULL,
    staffuserid INT NULL,
    PRIMARY KEY (id),
    INDEX staffid_idx (staffuserid ASC),
    CONSTRAINT subject_fk1
      FOREIGN KEY (classid)
      REFERENCES ams.class (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION,
    CONSTRAINT subject_fk2
      FOREIGN KEY (staffuserid)
      REFERENCES ams.user (id)
      ON DELETE SET NULL
      ON UPDATE NO ACTION)
  ENGINE = InnoDB;`

connection.query(createSubject, function (err, result) {
    if (err) throw err;
});

const createParentStudentMapping = `CREATE TABLE IF NOT EXISTS ams.parentstudentmapping (
    id INT NOT NULL AUTO_INCREMENT,
    parentuserid INT NOT NULL,
    studentuserid INT NOT NULL,
    institutionid INT NOT NULL,
    PRIMARY KEY (id),
    INDEX parentid_idx (parentuserid ASC),
    INDEX institutionid_idx (institutionid ASC),
    INDEX studentid_idx (studentuserid ASC),
    CONSTRAINT parentstudentmapping_fk1
      FOREIGN KEY (parentuserid)
      REFERENCES ams.user (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION,
    CONSTRAINT parentstudentmapping_fk2
      FOREIGN KEY (studentuserid)
      REFERENCES ams.user (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION,
    CONSTRAINT parentstudentmapping_fk3
      FOREIGN KEY (institutionid)
      REFERENCES ams.institution (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION)
  ENGINE = InnoDB;`
connection.query(createParentStudentMapping, function (err, result) {
    if (err) throw err;
});

const createTimetable = `CREATE TABLE IF NOT EXISTS ams.timetable (
    id INT NOT NULL ,
    subjectid INT NOT NULL,
    classid INT NOT NULL,
    day INT NOT NULL,
    hour INT NOT NULL,
    institutionid INT NOT NULL,
    PRIMARY KEY (id),
    INDEX subjectid_idx (subjectid ASC),
    INDEX institutionid_idx (institutionid ASC),
    INDEX classid_idx (classid ASC),
    CONSTRAINT timetable_fk1
      FOREIGN KEY (subjectid)
      REFERENCES ams.subject (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION,
    CONSTRAINT timetable_fk2
      FOREIGN KEY (classid)
      REFERENCES ams.class (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION,
    CONSTRAINT timetable_fk3
      FOREIGN KEY (institutionid)
      REFERENCES ams.institution (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION)
  ENGINE = InnoDB;`

connection.query(createTimetable, function (err, result) {
    if (err) throw err;
})

const createAttendance = `CREATE TABLE IF NOT EXISTS ams.attendance (
    id INT NOT NULL ,
    timetableid INT NULL,
    date DATE NOT NULL,
    studentuserid INT NOT NULL,
    institutionid INT NOT NULL,
    day INT NOT NULL,
    hour INT NOT NULL,
    subjectid INT NULL,
    classid INT NULL,
    PRIMARY KEY (id),
    INDEX studentid_idx (studentuserid ASC),
    INDEX institutionid_idx (institutionid ASC),
    INDEX timetableid_idx (timetableid ASC),
    INDEX attendance_fk4_idx (subjectid ASC),
    INDEX attendance_fk5_idx (classid ASC),
    CONSTRAINT attendance_fk1
      FOREIGN KEY (timetableid)
      REFERENCES ams.timetable (id)
      ON DELETE SET NULL
      ON UPDATE NO ACTION,
    CONSTRAINT attendance_fk2
      FOREIGN KEY (studentuserid)
      REFERENCES ams.user (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION,
    CONSTRAINT attendance_fk3
      FOREIGN KEY (institutionid)
      REFERENCES ams.institution (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION,
    CONSTRAINT attendance_fk4
      FOREIGN KEY (subjectid)
      REFERENCES ams.subject (id)
      ON DELETE SET NULL
      ON UPDATE NO ACTION,
    CONSTRAINT attendance_fk5
      FOREIGN KEY (classid)
      REFERENCES ams.class (id)
      ON DELETE SET NULL
      ON UPDATE NO ACTION)
  ENGINE = InnoDB;`

connection.query(createAttendance, function (err, result) {
    if (err) throw err;
})

const createStudentClassMapping = `CREATE TABLE IF NOT EXISTS ams.studentclassmapping (
    id INT NOT NULL,
    studentuserid INT NOT NULL,
    classid INT NOT NULL,
    PRIMARY KEY (id),
    INDEX studentclassmapping_fk1_idx (studentuserid ASC),
    INDEX studentclassmapping_fk2_idx (classid ASC),
    CONSTRAINT studentclassmapping_fk1
      FOREIGN KEY (studentuserid)
      REFERENCES ams.user (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION,
    CONSTRAINT studentclassmapping_fk2
      FOREIGN KEY (classid)
      REFERENCES ams.class (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION)
  ENGINE = InnoDB;
  `
connection.query(createStudentClassMapping, function (err, result) {
    if (err) throw err;
})

module.exports = {
    connection
}