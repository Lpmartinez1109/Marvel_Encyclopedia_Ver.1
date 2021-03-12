const connection = require("./connection");

class DB {
    constructor(connection){
        this.connection = connection;
    };
    findAllCharacters(){
        return this.connection.query(
            "SELECT hero.first_name, hero.last_name, hero.code_name"
        );
    };
    createHero(hero){
        return this.connection.query("INSERT INTO hero SET ?", hero)
    }
};