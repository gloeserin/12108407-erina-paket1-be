import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Books from "./BukuModel.js"; 
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Ulasan = db.define('Ulasan', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        },
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
    },
    ulasan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    tanggalUlasan: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true      
        }
    }
})

Ulasan.belongsTo(Users, { as: "user", foreignKey: "user_id" });
Ulasan.belongsTo(Books, { as: "book", foreignKey: "book_id" });



export default Ulasan;
