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



INSERT INTO service (service_name, image_path, description, full_description, isActive, date_created)
VALUES 
('Plumbing Services', 'src/assets/images/image.png', 'Plumbing repairs and installations', 'Our plumbing services cover everything from leak repairs to new installations. We ensure efficient and reliable plumbing solutions.', true, '2024-04-01'),
('Electrical Services', 'src/assets/images/image.png', 'Electrical repairs and upgrades', 'Trust our experienced electricians for all your electrical needs, from repairs to upgrades and installations.', true, '2024-04-01'),
('Roofing Services', 'src/assets/images/image.png', 'Roof repairs and replacements', 'Protect your property with our professional roofing services. We handle repairs, replacements, and inspections with expertise.', true, '2024-04-01'),
('HVAC Services', 'src/assets/images/image.png', 'Heating, ventilation, and air conditioning solutions', 'Stay comfortable year-round with our HVAC services. We offer installations, repairs, and maintenance for HVAC systems.', true, '2024-04-01'),
('Painting Services', 'src/assets/images/image.png', 'Interior and exterior painting', 'Transform your space with our painting services. From walls to ceilings, we deliver quality interior and exterior painting solutions.', true, '2024-04-01'),
('Flooring Services', 'src/assets/images/image.png', 'Flooring installations and repairs', 'Upgrade your floors with our flooring services. We install and repair various types of flooring materials for homes and businesses.', true, '2024-04-01'),
('Carpentry Services', 'src/assets/images/image.png', 'Custom carpentry and woodworking', 'Enhance your space with custom carpentry work. Our skilled carpenters create furniture, cabinets, and more to fit your needs.', true, '2024-04-01'),
('Landscaping Services', 'src/assets/images/image.png', 'Landscaping design and maintenance', 'Transform your outdoor spaces with our landscaping services. From design to maintenance, we create beautiful landscapes.', true, '2024-04-01'),
('Masonry Services', 'src/assets/images/image.png', 'Masonry repairs and installations', 'Improve your property\'s durability and aesthetics with our masonry services. We handle repairs, installations, and upgrades.', true, '2024-04-01'),
('Home Security Services', 'src/assets/images/image.png', 'Home security system installations', 'Protect your home with our advanced security system installations. We provide tailored solutions for your safety and peace of mind.', true, '2024-04-01');

SELECT * FROM service;


select * from contact;






