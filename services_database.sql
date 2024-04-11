drop database services;

create database services;
use services;



create table service(
service_id int primary key auto_increment,
service_name varchar(50),
image_path varchar(255),
description text,
full_description text,
isActive bool,
date_created date
);


create table contact(
contact_id int primary key auto_increment,
contact_name varchar(50),
contact_email varchar(50),
contact_phone varchar(15),
contact_date date,
message text,
service_name varchar(100)
);




drop table service;

SELECT * FROM service;


select * from contact;






