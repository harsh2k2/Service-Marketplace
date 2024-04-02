create database services;
use services;

create table service(
service_id int primary key auto_increment,
service_name varchar(50),
image_path varchar(255),
service_desc text,
isActive bool,
date_created date
);


create table contact(
contact_id int primary key auto_increment,
contact_name varchar(50),
contact_email varchar(50),
contact_phone varchar(15),
contact_date date,
message text
);


INSERT INTO service (service_name, image_path, service_desc, isActive, date_created)
VALUES 
('Construction and Renovation', 'src\assets\images\image.png', 'We offer top-notch construction and renovation services for residential and commercial properties.', true, '2024-04-01'),
('Interior Design', 'src\assets\images\image.png', 'Our interior design services create functional and aesthetically pleasing spaces tailored to your needs.', true, '2024-04-01'),
('Landscaping', 'src\assets\images\image.png', 'Transform your outdoor spaces with our professional landscaping services.', true, '2024-04-01');

INSERT INTO service (service_name, image_path, service_desc, isActive, date_created)
VALUES 
('Home Remodeling', 'src\assets\images\image.png', 'Revitalize your home with our comprehensive remodeling services. From kitchens to bathrooms, we do it all.', true, '2024-04-01'),
('Commercial Construction', 'src\assets\images\image.png', 'Our team specializes in commercial construction projects, delivering high-quality results on time and within budget.', true, '2024-04-01'),
('Exterior Renovation', 'src\assets\images\image.png', 'Enhance the curb appeal and functionality of your property with our exterior renovation services.', true, '2024-04-01'),
('Custom Home Building', 'src\assets\images\image.png', 'Bring your dream home to life with our custom home building expertise. We work closely with you to create a unique living space.', true, '2024-04-01');



select * from service;


