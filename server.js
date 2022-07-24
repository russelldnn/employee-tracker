const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const PORT = process.env.PORT || 3001;


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mypass',
    database: 'boring_business_db'
});
//arrow functions apparently dont work for connections || starts the connection
connection.connect(function (err) {
    startCall();
});

const startCall = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'pathTaken',
            message: 'Select an option to continue',
            choices: [
               'view departments',
               'view all roles',
               'view all employees',
               'add a department',
               'add a role',
               'add an employee',
               'update an employee role',
               'exit'
            ]
        }
    ])

.then((userChoice) => {
    const {pathTaken} = userChoice;

    if (pathTaken === 'view departments') {viewDepart();}
    if (pathTaken === 'view all roles') {viewRole();}
    if (pathTaken === 'view all employees') {viewEmployee();}
    if (pathTaken === 'add a department') {addDepart();}
    if (pathTaken === 'add a role') {addRole();}
    if (pathTaken === 'add an employee') {addEmployee();}
    if (pathTaken === 'update an employee role') {updateRole();}
    if (pathTaken === 'exit') {connection.end(), console.log('Thank you for accessing')};
})

}

const viewDepart = () => {
    connection.query("select department.id, department.name from department", (err, data) => {
        if (err) throw err;
        console.table(data);
        startCall();
    });

};

const viewRole = () => {
    connection.query("select role.id, role.title, role.salary, department.name from role join department on role.department_id = department.id", (err, data) => {
        if (err) throw err;
        console.table(data);
        startCall();
    });
};

const viewEmployee = () => {
    connection.query("select employee.id, employee.first_name, employee.last_name, role.title, role.salary, employee.manager_id from employee join role where employee.role_id = role.id", (err, data) => {
        if (err) throw err;
        console.table(data);
        startCall();
    });
};