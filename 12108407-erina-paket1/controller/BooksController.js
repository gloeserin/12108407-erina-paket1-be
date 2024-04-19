import Books from "../model/BukuModel.js";
import path from "path";
import Kategori from "../model/KategoriModel.js";
import Peminjaman from "../model/PeminjamanModel.js";
import Sequelize from "sequelize";
import Users from "../model/UserModel.js";

import { getPeminjamanByBookId } from "./PeminjamanController.js";

export const getUserBooks = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'alamat', 'role'],
            where: {
                uuid: req.cookies.userId
            },
            include: {
                model: Books,
                attributes: ['uuid', 'judul', 'deskripsi', 'penerbit', 'penulis', 'tahun', 'cover', 'stock']
            }
        });
        res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

export const getBooks = async (req, res) => {
    try {
        const user_id = req.cookies.userId;
        const peminjamans = await Peminjaman.findAll({
            where: {
                user_id: user_id,
                tanggalPengembalian: null
            }
        });
        const response = await Books.findAll({
            include: {
                model: Kategori,
                attributes: ['namaKategori']
            },
            attributes:
                [
                    'uuid',
                    'judul',
                    'stock',
                    'deskripsi',
                    'penerbit',
                    'penulis',
                    'tahun',
                    'cover'
                ],
            where: {
                uuid: {
                    [Sequelize.Op.notIn]: peminjamans.map(peminjaman => peminjaman.book_id)
                }
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBooksById = async (req, res) => {
    try {
        const user_id = req.cookies.userId;
        const book_id = req.params.id;
        const response = await Books.findOne({
            attributes:
                [
                    'uuid',
                    'judul',
                    'deskripsi',
                    'penerbit',
                    'penulis',
                    'tahun',
                    'stock',
                    'cover'
              
                ],
            include: [
                {
                    model: Kategori,
                    attributes: ['namaKategori']
                }
            ],
            where: {
                uuid: book_id
            }
        });
        const dipinjam = await getPeminjamanByBookId(book_id, user_id);
        res.status(200).json({ response, dipinjam });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createBooks = async (req, res) => {
    if (req.files === null) return res.status(400).json({ message: 'File not found!' });
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name).toLowerCase();
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];
    const { judul, deskripsi, penerbit, penulis, tahun, kategori_id, stock } = req.body;

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: 'File type not allowed!' });
    if (fileSize > 5000000) return res.status(422).json({ message: 'File size too large!' });

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ message: err });
        try {
            const response = await Books.create({
                judul: judul,
                deskripsi: deskripsi,
                penerbit: penerbit,
                penulis: penulis,
                tahun: tahun,
                stock: stock,
                kategori_id: kategori_id,
                cover: fileName
            });
            return res.status(201).json({ message: 'File uploaded!', data: response });
        } catch (error) {

            console.log(error.message);
            return res.status(500).json({ message: error.message });
        }
    });

};

export const updateBooks = async (req, res) => {
    const books = await Books.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!books) return res.status(404).json({ message: 'Books not found!' });
    let fileName = "";
    if (req.files === null) {
        fileName = books.cover;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name).toLowerCase();
        fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: 'File type not allowed!' });
        if (fileSize > 5000000) return res.status(422).json({ message: 'File size too large!' });

        file.mv(`./public/images/${fileName}`, async (err) => {
            if (err) return res.status(500).json({ message: err });
        });
    }
    const name = req.body.judul;
    const { judul, deskripsi, penerbit, penulis, tahun, kategori_id, stock } = req.body;

    try {
        const response = await Books.update({
            judul: judul,
            deskripsi: deskripsi,
            penerbit: penerbit,
            penulis: penulis,
            tahun: tahun,
            stock: stock,
            kategori_id: kategori_id,
            cover: fileName
        }, {
            where: {
                uuid: req.params.id
            }
        });
        return res.status(200).json({ message: 'Books updated!', data: response });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }


};

export const deleteBooks = async (req, res) => {
    try {
        const response = await Books.destroy({
            where: {
                uuid: req.params.id
            }
        });
        return res.status(200).json({ message: 'Books deleted!' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};
