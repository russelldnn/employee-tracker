const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mypass',
    database: 'boring_business_db'
});

connection.connect = () => {
    startCall();
}

startCall = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'baseLayer'
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



}