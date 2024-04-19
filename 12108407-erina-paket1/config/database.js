import { Sequelize } from "sequelize";

const db = new Sequelize('db_library', 'root', '', {
    dialect: "mysql",
    origin: 'localhost'
});

export default db;