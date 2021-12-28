CREATE DATABASE IF NOT EXISTS appointmentBooking;


USE appointmentBooking;

CREATE TABLE IF NOT EXISTS patients (
    patient_id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL,
    mobile VARCHAR(45),
    PRIMARY KEY (patient_id)
);

CREATE TABLE IF NOT EXISTS doctors (
    doctor_id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL,
    mobile VARCHAR(45),
    img VARCHAR(255),
    Doctor_Scout INT NOT NULL,
    major VARCHAR(45) NOT Null ,
    is_Available TINYINT DEFAULT 1,
    descriptionn VARCHAR(255) ,
    address VARCHAR(255) ,
    PRIMARY KEY (doctor_id)
);

CREATE TABLE IF NOT EXISTS appointments (
    appointments_id INT NOT NULL AUTO_INCREMENT,
    patient_id INT NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
    start_Datee TIMESTAMP,
    end_Date TIMESTAMP,
    doctor_id INT NOT NULL,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id),
    statuss TINYINT DEFAULT 0,
    PRIMARY KEY (appointments_id)
);