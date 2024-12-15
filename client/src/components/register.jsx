// Register.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../css/register.css'
const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [cedula,setCedula]= useState('');
    const [password, setPassword] = useState('');
    const [imagen,setImagen]= useState(null);
    const [role,setRole] = useState('')
    const [confirmPassword, setConfirmPassword] = useState(''); // Nuevo estado
    const [message, setMessage] = useState(''); // Cambiar a 'message' para manejar mensajes positivos y negativos
    // const [error, setError] = useState('');
     const [showPassword, setShowPassword] = useState(false);

     const navigate = useNavigate(); // Crea una instancia de navigate


    // Función para validar las contraseñas
    const validatePasswords = () => {
        if (password && confirmPassword) { // Solo validar si ambos campos no están vacíos
            if (password != confirmPassword) {
                setMessage('Las contraseñas no coinciden');
            } else {
                setMessage('Las contraseñas coinciden'); // Mensaje positivo si coinciden
            }
        } else {
            setMessage(''); // Limpiar mensaje si alguno de los campos está vacío
        }
    };


    const handleRegister = (e) => {
        e.preventDefault();
    
        // Validar que las contraseñas coincidan al enviar el formulario
        if (password !== confirmPassword) {
            setMessage('Las contraseñas no coinciden');
            return;
        }
    
        // Crear una nueva instancia de FormData
        const formData = new FormData();
        
        // Agregar los datos del formulario a FormData
        formData.append('users', JSON.stringify([{ // Asegúrate de que 'users' sea un array
            name: username,
            apellido: 'Apellido', // Cambia esto según tu formulario
            cedula: cedula,
            email: email,
            password: password,
            rol: role
        }]));
        
  console.log('imagen',imagen)

        // Agregar la imagen si es necesario
        if (imagen) {
            formData.append('image', imagen); // Asegúrate de que 'image' sea el nombre correcto
        }
    
        // Realizar la solicitud POST al endpoint de registro de tu API
        fetch('http://localhost:3009/create', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al registrar el usuario');
            }
            return response.json();
        })
        .then(data => {
            console.log('Registro exitoso', data);
            navigate('/')
            
        })
        .catch(error => {
            console.error('Error de registro:', error);
            setMessage(error.message);
        });
    };
    

       
    const togglePassword = () =>{
        setShowPassword(!showPassword);
    }

    return (
        <div className='register'>
        
            <h2>Registrarse</h2>
            <form onSubmit={handleRegister}>
                <div className='password-container'>
                    <label htmlFor="username">Nombre de usuario</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className='password-container'>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='password-container'>
                    <label htmlFor="cedula">Cedula</label>
                    <input
                        type="text"
                        id="cedula"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                        required
                    />
                </div>
                <div className='password-container'>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validatePasswords(); // Validar en tiempo real
                        }}
                        required
                        style={{ flex: 1, marginRight: '8px' }} // Para que el input ocupe el espacio disponible
                    />
                    <button type="button" onClick={togglePassword} style={{ cursor: 'pointer' }} className="password-toggle" >
                        {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                    </button>
                </div>
                <div className='password-container'>
                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            validatePasswords(); // Validar en tiempo real
                        }}
                        required
                    />
                     <button type="button" onClick={togglePassword} style={{ cursor: 'pointer' }} className="password-toggle" >
                        {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                    </button>
                </div>
                {message && <p className='message' style={{ color: password === confirmPassword ? 'green' : 'red' }}>  {password === confirmPassword 
            ? 'Las contraseñas coinciden' 
            : 'Las contraseñas no coinciden'}</p>}
               
                <div className='password-container'>
                    <label htmlFor="role">Role</label>
                    <input
                        type="number"
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    />
                </div>
                <div className='password-container'>
                    <label htmlFor="imagen">Imagen</label>
                    <input
                        type="file"
                        id="imagen"
                       // value={imagen}
                        onChange={(e) => setImagen(e.target.files[0])}
                        required
                    />
                </div>
             
                <button type="submit">Registrarse</button>
               </form>
            </div>
        
    );
};

export default Register;