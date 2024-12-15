import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle,faFacebookF,faTwitter,faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../css/login.css'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate(); // Cambia esto
    // Manejar el login tradicional
    const handleTraditionalLogin = (e) => {
        e.preventDefault();

        // Realizar la solicitud POST al endpoint de login de tu API
        fetch('http://localhost:3009/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password }),
            credentials: 'include',  // Asegura que las cookies de sesión se envíen
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Credenciales incorrectas');
            }
            return response.json();
        })
        .then(data => {
            console.log('Login exitoso', data);
            // Redirigir al usuario o actualizar el estado según sea necesario
            // Ejemplo: redirigir al perfil
            navigate('/profile'); 
        })
        .catch(error => {
            console.error('Error de login:', error);
            setError(error.message); // Mostrar el mensaje de error
        });
    };

    const togglePassword = () =>{
        setShowPassword(!showPassword);
    }

    // Manejar el login con proveedor
    const handleLogin = (provider) => {
        window.location.href = `http://localhost:3009/auth/${provider}`;
    };

    const handleRegisterRedirect = () => {
        navigate('/register'); // Redirige al formulario de registro
    };

    return (
        <div className='auth'>
            <div className='login'>
            <h2>Iniciar Sesión</h2>
            <img src="./images/contrasena.png" alt="" />
            </div>
            
           

            {/* Formulario de login tradicional */}
            <form onSubmit={handleTraditionalLogin} className='form-login'>
                <div className='password-container'>
                    <div className='email-container'>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    </div>
                </div>
                <div className='password-container'>
                    <div className='email-container'>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="button" onClick={togglePassword} style={{ cursor: 'pointer' }} className="password-toggle-login" >
                        {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                    </button>
                    </div>
                </div>
                {error && <p className='error' style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Iniciar sesión</button>
            </form>

            {/* Botones de inicio de sesión con redes sociales */}
            <div className='media'>
                <button className='google-button'  onClick={() => handleLogin('google')}>Continuar con Google <FontAwesomeIcon icon={faGoogle} /></button>
                <button className='twitter-button' onClick={() => handleLogin('twitter')}>Continuar con Twitter <FontAwesomeIcon icon={faTwitter} /> </button>
                <button className='github-button' onClick={() => handleLogin('github')}>Continuar con Github <FontAwesomeIcon icon={faGithub} /></button>
                <button className='facebook-button' onClick={() => handleLogin('facebook')}>Continuar con Facebook <FontAwesomeIcon icon={faFacebookF} /></button>
            </div>

            <p>
                ¿No tienes una cuenta?  
                <a 
                    onClick={handleRegisterRedirect} 
                    style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer',marginLeft:'5px' }}
                >
                     Regístrate
                </a>
            </p>
        </div>
    );
};

export default Login;
