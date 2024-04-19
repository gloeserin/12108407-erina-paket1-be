import Users from "../model/UserModel.js";
import Ulasan from "../model/UlasanModel.js";


export const createUlasan = async (req, res) => {
    const { user_id, book_id, ulasan, rating } = req.body;
    try {
        await Ulasan.create({
            user_id: user_id,
            book_id: book_id,
            ulasan: ulasan,
            tanggalUlasan: new Date(),
            rating: rating
        });
        res.status(201).json({ message: "Ulasan berhasil ditambahkan" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



    export const getUlasanById = async (req, res) => {
        try {
            const response = await Ulasan.findAll({
                where: {
                    book_id: req.params.id
                },
                include:{
                    model: Users,
                    as: "user",
                    attributes: ['uuid', 'name']
                },
                attributes:
                    [
                        "book_id",
                        "user_id",
                        "ulasan",
                        "tanggalUlasan",
                        "rating"
                    ],           
            });
            if (response) {
                res.status(200).json(response);
            } else {
                res.status(404).json({ message: "Ulasan not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


