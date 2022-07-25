drop database if exists business_db;
create database business_db;
use business_db;


create table department(
    id int auto_increment,
    name varchar(30) not null,
    primary key (id)
);

create table role(
    id int auto_increment,
    title varchar(100),
    salary int,
    department_id int,
    primary key (id),
    foreign key(department_id) references department(id)
);

create table employee(
    id int auto_increment,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int,
    primary key (id),
    foreign key(role_id) references role(id),
    foreign key(manager_id) references employee(id)
);

