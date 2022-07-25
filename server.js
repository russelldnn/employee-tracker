//requirements needed for inquirer and mysql2, port for saftey and consoletable documentation said to add it
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const PORT = process.env.PORT || 3001;

//creates the connection using my mysql information and database name
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
//the base layer prompt which branches off
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
    //if statement tree to direct functions
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
//all the functions that view, add and update accordingly
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

const addDepart = () => {
    inquirer.prompt ([
        {
            name: "newDepartment",
            type: "input",
            message: "What is the name of the new department?"
        }
    ])
    .then((data) => {
        connection.query("insert into department set ?", {name: data.newDepartment}, (err) => {
            if (err) throw err;
            console.log("the new department has been added");
            startCall();
        });
    });
};

const addRole = () => {
    inquirer.prompt ([
        {
            name: "newRole",
            type: "input",
            message: "What is the name of the new role?"
        },
        {
            name: "newSalary",
            type: "input",
            message: "What is this roles salary"
        },
        {
            name: "whatDepart",
            type: "input",
            message: "select a department number"
        }
    ])
    .then ((data) => {
        connection.query("insert into role set ?", {title: data.newRole, salary: data.newSalary, department_id: data.whatDepart}, (err) => {
            if (err) throw err;
            console.log("A new role is ready to be used");
            startCall();
        });
    });
};

const addEmployee = () => {
    inquirer.prompt ([
        {
            name: "newFirst",
            type: "input",
            message: "What is the employees first name?"
        },
        {
            name: "newLast",
            type: "input",
            message: "What is the employees last name?"
        },
        {
            name: "whatRole",
            type: "input",
            message: "What is the employees role ID?"
        },
        {
            name: "newManage",
            type: "input",
            message: "what is the manager ID for the employees manager?"
        }
    ])
    .then ((data) => {
        connection.query("insert into employee set ?", {first_name: data.newFirst, last_name: data.newLast, role_id: data.whatRole, manager_id: data.newManage}, (err) => {
            if (err) throw err;
            console.log("A new employee is ready for work");
            startCall();
        });
    });
};
//got a lot of help on this
const updateRole = () => {
    connection.query('select * from employee', function (err, employeeData) {
        if (err) throw err;
    connection.query('select * from role', function (err, roleData) {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "employeeName",
                type: "rawlist",
                message: "Select the employee to update",
                choices: employeeData.map(function(data) {
                    return `${data.first_name} ${data.last_name}`
                })
            },
            {
                name: "employeeRole",
                type: "rawlist",
                message: "what is the employees new role?",
                choices: roleData.map(function(data) {
                    return data.title
                })
            }
        ])
        .then (ndata => {
            connection.query ("update employee set ? where ?",
            [
                {
                    role_id: employeeData.find(function(data) {
                        return data.title === ndata.employeeRole
                    })
                },
                {
                    id: roleData.find(function(data) {
                        return `${data.first_name} ${data.last_name}` === ndata.employeeName
                    })
                }
            ],
            function (err) {
                if (err) throw err;
                console.log("an employee has been updated");
                startCall();
            }
            )

        })
    })
    })
};