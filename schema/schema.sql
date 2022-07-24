-- database commands to initiate and use the db
drop database if exists boring_business_db;
create database boring_business_db;
use boring_business_db;

-- creates three tables linked together with foreign keys
create table department(
    id int primary key auto_increment,
    name varchar(30) not null
);

create table role (
    id int primary key auto_increment,
    title varchar(100),
    salary int,
    department_id int,
    foreign key(department_id) references department(id)
);

create table employee (
    id int primary key auto_increment,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int,
    foreign key(role_id) references role(id),
    foreign key(manager_id) references employee(id)
);

