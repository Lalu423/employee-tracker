const inquirer = require('inquirer');
const { table } = require('table');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password: '',
        database: 'registrar_db'
    },
    console.log(`Connected to the employee database.`)
);


const menu =  async function () {
    //console.log("do stuff!")
    const answers = await inquirer.prompt([
        {
            message: 'What would you like to see?',
            type: 'list',
            name: 'option',
            choices: ["View all departments", "View all roles", "View all employees", "Add department", "Add role", "Add an employee", "update employee role"]
        }
    ])
    if(answers.option === "Add a course"){
        
    }
}

const config = {
    border: {
        topBody: `─`,
        topJoin: `┬`,
        topLeft: `┌`,
        topRight: `┐`,

        bottomBody: `─`,
        bottomJoin: `┴`,
        bottomLeft: `└`,
        bottomRight: `┘`,

        bodyLeft: `│`,
        bodyRight: `│`,
        bodyJoin: `│`,

        joinBody: `─`,
        joinLeft: `├`,
        joinRight: `┤`,
        joinJoin: `┼`
    }
};

async function showTable(data) {
    let tableData = [];
    tableData = [Object.keys(data[0]), ...data.map(val => Object.values(val))];


    const answers = await inquirer.prompt([
        {
            message: "/n" + table(tableData, config),
            type: 'input',
            name: 'name'
        }
    ]);



}

const dbData = [
    { id: 1, name: "Jonathan" },
    { id: 2, name: "Andrew" },
    { id: 3, name: "Pete" },
    { id: 4, name: "Nick" }
]


const init = async function () {

    await showTable(dbData)
    await menu();

}

init();