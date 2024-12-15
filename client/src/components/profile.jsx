import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Cambia useHistory por useNavigate
const Profile = () => {
    // Crear el estado para almacenar los datos del usuario
    const [user, setUser] = useState(null);
    const [apellido,setApellido] =useState('');
    const [cedula, setCedula] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [formVisible, setFormVisible] = useState(false); // Estado para controlar la visibilidad del formulario


    const navigate = useNavigate(); // Hook para redirigir


    // Fetch para obtener los datos del usuario
    useEffect(() => {
        fetch('http://localhost:3009/auth/user', {
            credentials: 'include', // Asegura que las cookies de sesión se envíen
        })
        .then(response =>{
            if (!response.ok) {
                // Si la respuesta no es ok (por ejemplo, 401), redirigir al inicio
                navigate('/'); // Cambia esto a la ruta que desees
                return;
            }

            return  response.json();

        })
        .then(data => {
            // Actualizar el estado con los datos del usuario
            setUser(data);
            console.log(data)
            // Verificar si los campos necesarios están vacíos
            if (!data.apellido || !data.cedula || !data.correo) {
                setFormVisible(true); // Mostrar el formulario si falta información
            }
        })
        .catch(error => console.error('Error al obtener el usuario:', error));
    }, [navigate]);


   const handleData=(e)=>{
    e.preventDefault();

    fetch(`http://localhost:3009/update/${user.id}`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json',
        },
        credentials:'include',
        body:JSON.stringify({apellido,cedula,email})
    })
    .then(async response =>{
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Error al actualizar los datos');
        }
        return response.json();
                
    })
    .then(data=>{
        console.log('Datos Actualizados', data);
        setError(''); // Limpiar el error si la actualización fue exitosa
        setFormVisible(false); // Ocultar el formulario
    })
    .catch(error => {
        console.error('Error de login:', error);
        setError(error.message); // Mostrar el mensaje de error

        
    });

   }



    // Mostrar una carga o los datos del usuario si están disponibles
    if (user === null) {
        return <div>Cargando...</div>;
    }

    // Determinar qué plataforma de autenticación se utilizó (Google, Facebook, etc.)
    let authMessage = '';
    if (user.google_id) {
        authMessage = 'Iniciaste sesión con Google';
    } else if (user.facebook_id) {
        authMessage = 'Iniciaste sesión con Facebook';
    } else if (user.github_id) {
        authMessage = 'Iniciaste sesión con GitHub';
    } else if (user.twitter_id) {
        authMessage = 'Iniciaste sesión con Twitter';
    } else {
        authMessage = 'No se ha asociado ninguna cuenta social';
    }

    return (
        <div>
            <h1>Bienvenido, {user.nombre}!</h1>
            <p>Correo electrónico: {user.correo}</p>
            <p>Rol: {user.rol }</p>
            <p>{authMessage}</p>


   {/* Si tienes una imagen de perfil, la muestras */}
   {user.imagen && <img src={user.imagen} alt="Imagen de perfil" />}

{ formVisible && (
         <div className="auth complete" style={{height: '510px'}}>
             <form onSubmit={handleData} className="form-login">

                <h2>Para continuar termine de completar tu perfil</h2>
                    <div className="password-container">
                    <div className="email-container">

                        <label>Apellido:</label>
                        <input
                        type="text"
                        id="apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                      
                        
                    />
                    </div>
                    </div>

                    <div className="password-container">
                    <div className="email-container">
                        <label>Cedula:</label>
                        <input
                        type="text"
                        id="cedula"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                    />
                    </div>
                    </div>

                    
                            <div className="password-container">
                                <div className="email-container">
                                    <label>Correo electrónico:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        

                
                <button type="submit">Enviar</button>
              </form>
            </div>
)}
         


            <button onClick={() => window.location.href = 'http://localhost:3009/auth/logout'}>
             Cerrar sesión
            </button>

        </div>
    );
}

export default Profile;
