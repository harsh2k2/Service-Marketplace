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
SELECT * FROM service where isActive = 1;



UPDATE service SET isActive = 0 WHERE service_id = 1;

SELECT * FROM service ORDER BY service_id where isActive = 1 LIMIT 4;


select * from contact;


create table blog(
blog_id int primary key auto_increment,
blog_name TEXT,
slug VARCHAR(255);
blog_image varchar(255),
full_description text,
isActive bool,
date_created date
);

select * from blog;

drop table blog;





