import Kategori from "../model/KategoriModel.js";

export const getKategori = async (req, res) => {
    try {
        const response = await Kategori.findAll({
            attributes:
                [
                    'uuid',
                    'namaKategori'
                ],
            order: [
                ['namaKategori', 'ASC'],
            ],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createKategori = async (req, res) => {
    const { namaKategori } = req.body;
    try {
        await Kategori.create({
            namaKategori: namaKategori
        });
        res.status(201).json({ message: "Kategori berhasil ditambahkan" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateKategori = async (req, res) => {
    const { namaKategori } = req.body;
    try {
        await Kategori.update({
            namaKategori: namaKategori
        }, {
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({ message: "Kategori berhasil diupdate" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getKategoriById = async (req, res) => {
    try {
        const response = await Kategori.findOne({
            attributes:
                [
                    'uuid',
                    'namaKategori'
                ],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteKategori = async (req, res) => {
    try {
        await Kategori.destroy({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({ message: "Kategori berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}