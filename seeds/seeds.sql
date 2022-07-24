
insert into department (name)
values
("design"),
("finance"),
("rigging"),
("animation"),
("quality_control");

insert into role (title, salary, department_id)
values
("intern", 8000, 1),
("lead", 10000, 2),
("support", 5000, 2),
("emotional_support", 4000, 5),
("helper", 12000, 3),
("leech", 3000, 4);

insert into employee (first_name, last_name, role_id, manager_id)
values
("John", "TheBoss", 2, NULL),
("Simon", "Mosby", 4, 1),
("Ronda", "Hill", 1, 1),
("Matt", "Middle", 6, NULL),
("Wendy", "Ramson", 3, NULL),
("Running", "OuttaNames", 5, NULL),
("Russell", "Dunn", 4, NULL),
("Chloe", "Cherry", 5, 7);