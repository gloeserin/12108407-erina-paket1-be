import Users from "../model/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
    const User = await Users.findOne({ 
        where: { 
            email: req.body.email 
        } 
    });
    if(!User) return res.status(400).json({message: "Email Salah"});
    const match = await argon2.verify(User.password, req.body.password);
    if(!match) return res.status(400).json({message: "Password Salah"});
    req.session.userId = User.uuid;
    const uuid = User.uuid;
    const name = User.name;
    const email = User.email;
    const alamat = User.alamat;
    const role = User.role;
    res.cookie("userId", uuid, {expire: new Date() +9998});
    res.cookie("role", role, {expire: new Date() +9998});
    return res.status(200).json({uuid, name, email, alamat, role});
};

export const Me = async (req, res) => {
    if(!req.session.userId) {
        return res.status(401).json({message: "Tidak ada user yang login"});
    }
    const User = await Users.findOne({
        attributes: ['uuid', 'name', 'email', 'alamat', 'role'],     
        where: { 
            uuid: req.session.userId 
        } 
    });
    if(!User) return res.status(404).json({message: "user tidak ditemukan"});
    res.status(200).json(User);
}

export const Logout = async (req, res) => {
    res.clearCookie("userId");
    res.clearCookie("role");
    return res.status(200).json({
      success: "Logout success",
    });
}


