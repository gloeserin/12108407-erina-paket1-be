import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Books from "./BukuModel.js";
import Users from "./UserModel.js";


const { DataTypes } = Sequelize;

const koleksiPribadi = db.define('koleksipribadi', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Users,
            key: 'uuid'
        }
    },
    book_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Books,
            key: 'uuid'
        }
    }
});


export default koleksiPribadi;
