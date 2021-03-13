 const {prompt} = require("inquirer");
 const logo = require("asciiart-logo");
 const db = require("./db");
const { inherits } = require("util");
const { removeTeam } = require("./db");
 require("console.table");

 init();

 function init(){
     const logoText = logo({ name: "Marvel Database"}).render();

     console.log(logoText);
     loadMainPrompts();
 };

 async function loadMainPrompts() {
     console.log("This is working!")
     const {choice} = await prompt([
         {
             type: "list",
             name: "choice",
             message: "What would you like to do?",
             choices: [
                 {
                     name: "View All Characters",
                     value: "VIEW_CHARACTERS"
                 },
                 {
                     name: "Add Character",
                     value: "ADD_CHARACTER"
                 },
                 {
                     name: "Remove Character",
                     value: "REMOVE_CHARACTER"
                 },
                 {
                     name: "View All Teams",
                     value: "VIEW_TEAMS"
                 },
                 {
                     name: "Add Team",
                     value: "ADD_TEAM"
                 },
                 {
                     name: "Remove Team",
                     value: "REMOVE_TEAM"
                 },
                 {
                     name: "Quit",
                     value: "QUIT"
                 }
             ]
         }
     ]);

     switch(choice){
         case "VIEW_CHARACTERS":
             return viewCharacters();
        case "ADD_CHARACTERS":
            return addCharacter();
        case "REMOVE_CHARACTERS":
            return removeCharacter();
        case "VIEWS_TEAMS":
            return viewTeam();
        case "ADD_TEAM":
            return addTeam();
        case "REMOVE_TEAM":
            return removeTeam();
        default:
            return quit();
     }
 }

 async function viewCharacters(){
     const characters = await db.findAllCharacters();
     console.table(marvel);
     loadMainPrompts();
 };
 async function addCharacter(){
     const characters = await db.findAllCharacters();

     const character = await prompt([
         {
             name: "first_name",
             message: "What is the character's first name?"
         },
         {
             name: "last_name",
             message: "What is the character's last name?"
         },
         {
             name: "code_name",
             message: "What is the character's alias?"
         }
     ]);
     await db.createCharacter(character);
     console.log(
         `Added ${character.first_name} ${character.last_name} otherwise known as ${character.code_name} to database`
     );

     loadMainPrompts();
 };
 
 async function removeCharacter(){
     const characters = await db.findAllCharacters();
     const characterChoice = characters.map(({id,first_name,last_name,code_name})=> ({
         name: `${first_name} ${last_name} ${code_name}`,
         value: id
     }));
     const {characterID} = await prompt([
         {
             type: "list",
             name: "characterID",
             message: "Which character do you wish to remove?",
             choices: characterChoice
         }
     ]);
     await db.removeCharacter(characterID);
     console.log("Character is remove from database!")
     loadMainPrompts();
 }

 function quit(){
     console.log("Goodbye for now!");
     process.exit();
 }