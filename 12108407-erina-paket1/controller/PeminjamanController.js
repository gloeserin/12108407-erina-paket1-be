import Users from "../model/UserModel.js";
import Peminjaman from "../model/PeminjamanModel.js";
import koleksiPribadi from "../model/KoleksiModel.js";
import Books from "../model/BukuModel.js";


export const createPinjam = async (req, res) => {
  try {
    const book_id = req.params.id;
    const {user_id} = req.body;
    const tanggalPeminjaman = new Date();
    
    const peminjaman = await Peminjaman.create({
      book_id,
      user_id,
      tanggalPeminjaman,
    });

    const koleksi = await koleksiPribadi.create({
      book_id,
      user_id,
    });

    const buku = await Books.findOne(
      {
        where: {
          uuid: req.params.id,
        },
      }
    );
    await buku.update({
      stock: buku.stock - 1,
    });
    await buku.save();
    res.status(201).json(peminjaman);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPeminjamanByBookId = async (book_id, user_id) => {
  try {
    const response = await Peminjaman.findOne({
      where: {
        book_id,
        user_id,
        tanggalPengembalian: null,
      },
    });
    if(response) return true;
    return false;
  } catch (error) {
    return false;
  }
}

export const pengembalian = async (req, res) => {
  try{
  const book_id = req.params.id;
  const user_id = req.cookies.userId;
  const peminjaman = await Peminjaman.update({
    tanggalPengembalian: new Date(),
  }, {
    where: {
      book_id,
      user_id,
      tanggalPengembalian: null,
    }
  })
  if(!peminjaman) return res.status(404).json({message: "Peminjaman tidak ditemukan"});

  const buku = await Books.findOne(
    {
      where: {
        uuid: req.params.id,
      },
    }
  );
  await buku.update({
    stock: buku.stock + 1,
  });
  await buku.save();
  const koleksi = await koleksiPribadi.destroy({
    where: {
      book_id,
      user_id,
    }
  });

  res.status(201).json({message: "Pengembalian berhasil"});
  }catch(e){
res.status(500).json({message: e.message});
  }
}

export const getPinjamByUserId = async (req, res) => {
  try {
    const user_id = req.cookies.userId;
    const response = await Peminjaman.findAll({
      where: {
        user_id,
      },
      include: [
        {
          model: Books,
          attributes: ['judul', 'deskripsi', 'penerbit', 'penulis', 'tahun', 'cover']
        },
        {
          model: Users,
          attributes: ['name', 'email']
        }
      ],      
     
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getPinjam = async (req, res) => {
  try {
    const response = await Peminjaman.findAll({
      include: [
        {
          model: Books,
          attributes: ['judul', 'deskripsi', 'penerbit', 'penulis', 'tahun', 'cover']
        },
        {
          model: Users,
          attributes: ['name', 'email']
        }
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}