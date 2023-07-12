import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
    };
  
    try {
      const response = await axios.post('http://localhost:3001/forgot-password', data);

      console.log(response)

      if (response.status === 200) {
        console.log('Form submitted successfully!');
        console.log(response)
        setMessage("Linkul pentru resetarea parolei a fost trimis")
      } else{
        setMessage("ceva nu a mers")

      }

    } catch (error) {
      console.error('Eroare la solicitarea de resetare a parolei:', error);
      if(error.response.status === 404){
        setMessage("nu am gasit asa email in baza de date");
      } else if(error.response.status === 404){
        console.log("eroare la server")
      }
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
      <h1>Resetare parolă</h1>
      <form onSubmit={handleSubmit} className='login-form'>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Adresa de email"
          required
          className="input-forgotpass"
        />
        <button type="submit" className="login-register-button" >Trimite emailul de resetare a parolei</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </div>
  );
};

export default ForgotPasswordPage;
