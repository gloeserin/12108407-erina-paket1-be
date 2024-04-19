import express  from "express";
import cors from 'cors';
import session from "express-session";
import dotenv from 'dotenv';
import db from './config/database.js';
import UserRoute from './routes/UserRoutes.js';
import BookRoute from './routes/BookRoutes.js';
import KategoriRoute from './routes/KategoriRoutes.js';
import Books from "./model/BukuModel.js";
import koleksiPribadi from "./model/KoleksiModel.js";
import Users from "./model/UserModel.js";
import Kategori from "./model/KategoriModel.js";
import Ulasan from "./model/UlasanModel.js";
import cookieParser from "cookie-parser";

import PeminjamanRoute from "./routes/PeminjamanRoutes.js";
import AuthRoute from "./routes/AuthRoutes.js";
import UlasanRoute from "./routes/UlasanRoutes.js";
import FileUpload from "express-fileupload";
import SequelizeStore from "connect-session-sequelize";

Books.belongsToMany(Users, { through: 'koleksipribadis', foreignKey: 'book_id', otherKey: 'user_id'  });


dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db : db
});

( () => {
     db.sync();
})();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store : store,
    cookie: {
        secure: 'auto'
    }
}))

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:5173']
}));

app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(cookieParser());
app.use(UserRoute);
app.use(BookRoute);
app.use(AuthRoute);
app.use(KategoriRoute);
app.use(PeminjamanRoute);
app.use(UlasanRoute);





app.listen(process.env.APP_PORT, ()=> {
    console.log(`Server is running on port `);
})
