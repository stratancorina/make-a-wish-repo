import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect,useState } from 'react';


function ResetPassword() {
    const { id, token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [newPassword2, setNewPassword2] = useState(''); 
    const [message, setMessage] = useState('');

    useEffect(() => {
      const verifyToken = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/reset-password/${id}/${token}`);
        } catch (error) {
        }
      };
  
      verifyToken();
    }, [id, token]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`http://localhost:3001/reset-password/${id}/${token}`, { id, token, newPassword, newPassword2});
        console.log(response)
        console.log("parola a fost resetata")
        setMessage("Parola a fost resetata cu succes!")
      } catch (error) {
        console.log(error)
      }
    };

return (
  <div className="page-container background">
      
  <div className="elements">
        <div className="square sq1"></div>
        <div className="square sq2"></div>
        <div className="square sq3"></div>
    </div> 
    <div className="above-background login-page">
      <h1>Introdu noua parolă</h1>
      <form onSubmit={handleSubmit} className='login-form'>
        <input
        id="password"
          type="password"
          placeholder="Parola noua"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{marginBottom:"10px"}}
        />
        <input
        id="password2"
          type="password"
          placeholder="Confirma noua parola"
          value={newPassword2}
          onChange={(e) => setNewPassword2(e.target.value)}
          className="input-forgotpass"
        />
        <button type="submit" className="login-register-button">Continua</button>
      </form>
      {message && <div 
          style={{marginBottom:"10px"}}
          > <p>{message}</p> Mergi la pagina de <a href='/login'>login</a></div>}

      </div>
    </div>
  );
}

export default ResetPassword;
