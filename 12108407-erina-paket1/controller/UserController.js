import Users from "../model/UserModel.js";
import argon2 from "argon2";

export const createUser = async  (req, res) => {
    const { name, email, password, alamat, role } = req.body;
    const hashPassword = await argon2.hash(password);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            alamat: alamat,
            role: role
        });
        res.status(201).json({message: "Register Berhasil"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const register = async (req, res) => {
    const { name, email, password, alamat } = req.body;
    const hashPassword = await argon2.hash(password);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            alamat: alamat,
            role: "user"
        });
        res.status(201).json({message: "Register Berhasil"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

export const createPetugas = async (req, res) => {
    const { name, email, password, alamat, } = req.body;
    const hashPassword = await argon2.hash(password);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            alamat: alamat,
            role: "petugas"
        });
        res.status(201).json({message: "Petugas berhasil ditambahkan"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updatePetugas = async (req, res) => {
    const { name, email, alamat } = req.body;
    try {
        await Users.update({
            name: name,
            email: email,
            alamat: alamat
        }, {
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({message: "Petugas berhasil diupdate"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getPetugas = async (req, res) => {
    try {
        const users = await Users.findAll({
            where: {
                role: "petugas"
            },
            order: [
                ['name', 'ASC'],
            ],
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getPetugasById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Users.findOne({
            where: { uuid: id }
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deletePetugas = async (req, res) => {
    try {
        await Users.destroy({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({message: "Petugas berhasil dihapus"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
} 

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Users.findOne({
            where: { uuid: id }
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}