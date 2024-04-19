import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Books from "./BukuModel.js";
import Users from "./UserModel.js";

const { DataTypes } = Sequelize;

const Peminjaman = db.define('peminjaman', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        primaryKey: true
    },
    tanggalPeminjaman: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    tanggalPengembalian: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            notEmpty: true
        }
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


Peminjaman.belongsTo(Users, { foreignKey: 'user_id' });
Peminjaman.belongsTo(Books, { foreignKey: 'book_id' });

export default Peminjaman;