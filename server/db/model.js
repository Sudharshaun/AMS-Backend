const mysql = require('mysql2');
const config = require('../config');
const connection = mysql.createConnection(config.mysqlConfig.mysql);

connection.connect(err => {
  if (err) throw err;
  console.log('DataBase Connected');
})

const createInstitution =
  `CREATE TABLE IF NOT EXISTS ams.institution (
    id INT NOT NULL ,
    name VARCHAR(45) NOT NULL,
    address VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    PRIMARY KEY (id, email))
  ENGINE = InnoDB;`

connection.query(createInstitution, function (err, result) {
  if (err) throw err;
});

const createStudent = `CREATE TABLE IF NOT EXISTS ams.student (
    id INT NOT NULL ,
    name VARCHAR(45) NOT NULL,
    institutionid INT NOT NULL,
    PRIMARY KEY (id),
    INDEX institutionid_idx (institutionid ASC),
    CONSTRAINT student_fk2
      FOREIGN KEY (institutionid)
      REFERENCES ams.institution (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION)
  ENGINE = InnoDB;`

connection.query(createStudent, function (err, result) {
  if (err) throw err;
});

const createClass = `CREATE TABLE IF NOT EXISTS ams.class (
    id INT NOT NULL ,
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

const createStaff = `CREATE TABLE IF NOT EXISTS ams.staff (
    id INT NOT NULL ,
    name VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    phonenumber INT NOT NULL,
    age TINYINT(10) NOT NULL,
    gender TINYINT(10) NOT NULL,
    institutionid INT NOT NULL,
    PRIMARY KEY (id),
    INDEX institutionid_idx (institutionid ASC),
    CONSTRAINT staff_fk1
      FOREIGN KEY (institutionid)
      REFERENCES ams.institution (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION)
  ENGINE = InnoDB;
  `
connection.query(createStaff, function (err, result) {
  if (err) throw err;
});

const createSubject = `CREATE TABLE IF NOT EXISTS ams.subject (
    id INT NOT NULL ,
    name VARCHAR(45) NOT NULL,
    classid INT NOT NULL,
    staffid INT NULL,
    PRIMARY KEY (id),
    INDEX staffid_idx (staffid ASC),
    CONSTRAINT subject_fk1
      FOREIGN KEY (classid)
      REFERENCES ams.class (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION,
    CONSTRAINT subject_fk2
      FOREIGN KEY (staffid)
      REFERENCES ams.staff (id)
      ON DELETE SET NULL
      ON UPDATE NO ACTION)
  ENGINE = InnoDB;`

connection.query(createSubject, function (err, result) {
  if (err) throw err;
});

const createExam = `CREATE TABLE IF NOT EXISTS ams.exam (
    id INT NOT NULL ,
    name VARCHAR(45) NOT NULL,
    exam VARCHAR(45) NOT NULL,
    institutionid INT NULL,
    PRIMARY KEY (id),
    INDEX institutioinid_idx (institutionid ASC),
    CONSTRAINT exam_fk1
      FOREIGN KEY (institutionid)
      REFERENCES ams.institution (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION)
  ENGINE = InnoDB;
  `

connection.query(createExam, function (err, result) {
  if (err) throw err;
});

const createMark = `CREATE TABLE IF NOT EXISTS ams.mark (
    id INT NOT NULL ,
    mark INT NOT NULL,
    total INT NOT NULL,
    percentage INT NOT NULL,
    studentid INT NOT NULL,
    subjectid INT NOT NULL,
    institutionid INT NOT NULL,
    classid INT NOT NULL,
    INDEX institutionid_idx (institutionid ASC),
    PRIMARY KEY (id),
    INDEX studentid_fk2_idx (studentid ASC),
    INDEX mark_fk4_idx (classid ASC),
    CONSTRAINT mark_fk1
      FOREIGN KEY (institutionid)
      REFERENCES ams.institution (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION,
    CONSTRAINT mark_fk2
      FOREIGN KEY (studentid)
      REFERENCES ams.student (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION,
    CONSTRAINT mark_fk3
      FOREIGN KEY (subjectid)
      REFERENCES ams.subject (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION,
    CONSTRAINT mark_fk4
      FOREIGN KEY (classid)
      REFERENCES ams.class (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION)
  ENGINE = InnoDB;
  `
connection.query(createMark, function (err, result) {
  if (err) throw err;
});


const createParent = `CREATE TABLE IF NOT EXISTS ams.parent (
    id INT NOT NULL ,
    name VARCHAR(45) NOT NULL,
    phonenumber INT NOT NULL,
    email VARCHAR(45) NOT NULL,
    address VARCHAR(45) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(45) NOT NULL,
    institutionid INT NOT NULL,
    PRIMARY KEY (id),
    INDEX instituionid_idx (institutionid ASC),
    CONSTRAINT parent_fk1
      FOREIGN KEY (institutionid)
      REFERENCES ams.institution (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION)
  ENGINE = InnoDB;`

connection.query(createParent, function (err, result) {
  if (err) throw err;
});

const createParentStudentMapping = `CREATE TABLE IF NOT EXISTS ams.parentstudentmapping (
    id INT NOT NULL ,
    parentid INT NOT NULL,
    studentid INT NOT NULL,
    institutionid INT NOT NULL,
    PRIMARY KEY (id),
    INDEX parentid_idx (parentid ASC),
    INDEX institutionid_idx (institutionid ASC),
    INDEX studentid_idx (studentid ASC),
    CONSTRAINT parentstudentmapping_fk1
      FOREIGN KEY (parentid)
      REFERENCES ams.parent (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION,
    CONSTRAINT parentstudentmapping_fk2
      FOREIGN KEY (studentid)
      REFERENCES ams.student (id)
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

const createAdmin = `CREATE TABLE IF NOT EXISTS ams.admin (
    id INT NOT NULL ,
    name VARCHAR(45) NOT NULL,
    age INT NOT NULL,
    phonenumber INT NOT NULL,
    address VARCHAR(45) NOT NULL,
    institutionid INT NOT NULL,
    email VARCHAR(45) NOT NULL,
    PRIMARY KEY (id, name),
    INDEX institutionid_idx (institutionid ASC),
    CONSTRAINT admin_fk1
      FOREIGN KEY (institutionid)
      REFERENCES ams.institution (id)
      ON DELETE CASCADE
      ON UPDATE NO ACTION)
  ENGINE = InnoDB;
  `

connection.query(createAdmin, function (err, result) {
  if (err) throw err;
})

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
    studentid INT NOT NULL,
    institutionid INT NOT NULL,
    day INT NOT NULL,
    hour INT NOT NULL,
    subjectid INT NULL,
    classid INT NULL,
    PRIMARY KEY (id),
    INDEX studentid_idx (studentid ASC),
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
      FOREIGN KEY (studentid)
      REFERENCES ams.student (id)
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
    studentid INT NOT NULL,
    classid INT NOT NULL,
    PRIMARY KEY (id),
    INDEX studentclassmapping_fk1_idx (studentid ASC),
    INDEX studentclassmapping_fk2_idx (classid ASC),
    CONSTRAINT studentclassmapping_fk1
      FOREIGN KEY (studentid)
      REFERENCES ams.student (id)
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