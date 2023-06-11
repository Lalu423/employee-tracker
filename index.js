const inquirer = require('inquirer');
const { table } = require('table');
const mysql = require('mysql2/promise');

//Needed for Heroku
const PORT = process.env.PORT || 3001;

// Connect to database
let db = mysql.createConnection(
    {
        host: 'localhost',
        user:'root',
        password: 'Bruno515!',
        database: 'registrar_db'
    },
)
.then((connection) => {
    db = connection;
    console.log(`Connected to the registrar_db databse.`)
});

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
            message: "\n" + table(tableData, config),
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

const addEmployee = async function() {
    console.log("test");

    const results = await db.query("SELECT * FROM employee");
    const dbData = results[0];
    const choiceData = dbData.map((row) => ({
        name: row.first_name + " " + row.last_name,
        value: row
    })) 
    choiceData.push({
        name: "No Employee",
        value: {id: null}
    })
    //await showTable(results);
   const firstAnswer = await inquirer.prompt([
    {
      message: "Enter their first name",
      type: 'input',
      name: "first_name"
    }
  ]);
  // console.log(firstAnswer);
  // console.log(firstAnswer.instructor.id);

  const otherData = await inquirer.prompt([
    {
      message: "Enter their last name",
      type: 'input',
      name: "last_name"
    },
    {
      message: "What is their role?",
      type: 'input',
      name: "role"
    },
    {
      message: "What is their manager_id",
      type: 'input',
      name: "manager"
    },
  ]);
  otherData.date_added = "2023-06-06";
  otherData.role_id = firstAnswer.employee.first_name;
  await showTable([otherData]);
  // console.log(otherData);
  await db.query("INSERT INTO employee SET ?", otherData);
  await menu();
};

const addDepartment = async function () {
    const answers = await inquirer.prompt
    ([
        {
            message: "What is the name of the new department?",
            type:"input",
            name:"dep_name"

        }

    ])
    await db.query("INSERT INTO department SET ?", answers);
    await menu();
}


const menu =  async function () {
    //console.log("do stuff!")
    const answers = await inquirer.prompt([
        {
            message: 'What would you like to see?',
            type: 'list',
            name: 'option',
            choices: ["View all departments", "View all roles", "View all employees", "Add department", "Add role", "Add employee", "update employee role"]
        }
    ])
    if(answers.option === "Add employee"){
        addEmployee();
        
    }
    if(answers.option === "View all departments"){
        viewDepartments();
    }
    if(answers.option === "View all roles"){
        viewRoles();
    }
    if(answers.option === "View all employees"){
        viewEmployee();
    }
    if(answers.option === "Add department"){
        addDepartment();
    }
}

const viewDepartments = async function () {
    const results = await db.query("SELECT * FROM department");
    const dbData = results[0];
    await showTable(dbData)
    await menu();
    
}

const viewRoles = async function () {
    const results = await db.query("SELECT * FROM roles JOIN department ON roles.department_id=department.id");
    const dbData = results[0];
    await showTable(dbData)
    await menu();
    
}

const viewEmployee = async function () {
    const results = await db.query("SELECT * FROM employee JOIN roles ON employee.role_id=role.id");
    const dbData = results[0];
    await showTable(dbData)
    await menu();
    
}




const init = async function () {

    //await showTable(dbData)
    await menu();

}

init();