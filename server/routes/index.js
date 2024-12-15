import { Router } from "express";
import authGoogle from './authGoogleRoutes.js';
import authFacebook from  './authFacebookRoutes.js';
import authTwitter from './authTwitterRoutes.js';
import authGithub from './authGithubRoutes.js'
import loginRoutes from  './loginRoutes.js';
import registerRoutes from './registerRoutes.js';

const  router = Router();


router.use(authGoogle)

router.use(authFacebook)

router.use(authTwitter)

router.use(authGithub)

router.use(loginRoutes)

router.use(registerRoutes)

// Ruta para obtener los datos del usuario autenticado
router.get('/auth/user', (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user); // Enviar los datos del usuario si está autenticado
    } else {
        res.status(401).json({ message: 'Usuario no autenticado' });
    }
});



export default router;
