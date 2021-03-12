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
    };
    removeHero(heroID){
        return this,connection.query("DELETE FROM hero WHERE id = ?", heroID);
    };
    findAllTeams(){
        return this.connection.query(
            "SELECT team.name"
        );
    };
    createTeam(team){
        return this.connection.query("INSERT INTO team SET ?", team);
    };
    removeTeam(teamID){
        return this.connection.query(
            "DELETE FROM team WHERE id = ?", teamID
        );
    };
};

module.exports = new DB(connection);