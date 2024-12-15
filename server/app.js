import express,{json} from  'express';
import cors from 'cors'
import routes from  './routes/index.js';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import  session from 'express-session';
import morgan from 'morgan';
import './controllers/authGoogleController.js';  // Asegúrate de que se configure passport
import  './controllers/authFacebookController.js';  // Asegúrate de que se configure passport
import  './controllers/authTwitterController.js'; 
import   './controllers/authGithubController.js'; 
import  './controllers/loginController.js'; // Asegúrate de que se configure passport
import path from 'path';
import { fileURLToPath } from 'url';


// Obtener la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



    
const app =  express();


app.use(session({
    secret:'victorcamacaro',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Cambia a true en producción con HTTPS
    
}))

app.use(passport.initialize());
app.use(passport.session())
/*
app.use(cors({
  origin: 'http://localhost:3000', // Allow only this origin
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));
*/

app.use(morgan('dev'));  // 'dev' es para formato de desarrollo

app.disable('x-powered-by')

app.use(cookieParser());

app.use(json())

app.use(express.static(path.join(__dirname,'../client/dist')))

app.use(routes)



// Maneja la ruta raíz y redirige a index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});


// Catch-all route to serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Middleware para manejar rutas no definidas (404)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
  });
  
  // Middleware para manejar errores generales
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Ocurrió un error en el servidor' });
  });
  


const PORT = process.env.PORT ?? 3009


app.listen(PORT,()=>{
console.log(`Server running on  ${PORT}`)
})
