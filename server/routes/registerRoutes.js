import { Router } from "express";
import registerController from "../controllers/registerController.js";
import upload from '../middlewares/multer.js'

const router = Router();

//Ruta para crear uno o varios usuarios
 router.post('/create',upload.array('image'),registerController.createUsers)

 router.put('/update/:id',upload.single('image'),registerController.updateUser)

 export default router