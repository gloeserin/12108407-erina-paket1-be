import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./UserModel.js";
import Kategori from "./KategoriModel.js";

const { DataTypes } = Sequelize;

const Books = db.define('books', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },
    judul: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    deskripsi: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    penerbit: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    penulis: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    tahun: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0,
        validate: {
            notEmpty: true,
        }
    },
    cover: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    kategori_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Kategori,
            key: 'uuid'
        }
    }
}, {
    freezeTableName: true,

});

Books.belongsTo(Kategori, { foreignKey: 'kategori_id' });


export default Books;