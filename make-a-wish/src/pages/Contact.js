import React, { useState } from 'react'
import backgroundImage from "../images/54.jpg";
import "../Background.css"

import emailjs from 'emailjs-com';

function Contact() {

const[messageSent, setMessageSent] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    const { from_email, from_name, message } = e.target.elements;

    const formData = new FormData();
    formData.append('from_email', from_email.value);
    formData.append('from_name', from_name.value);
    formData.append('message', message.value);
    formData.append('reply_to', from_email.value);

  
    emailjs
      .sendForm(
        'service_make_a_wish',
        'template_yw74jzf',
        e.target,
        'fEYfzzryw6FzITx1z'
      )
      .then((result) => {
        console.log(result.text);
        setMessageSent("Email Trimis!")
        console.log("email-sent")
      })
      .catch((error) => {
        console.error(error);
        setMessageSent("A aparut o eroare: ", error)
      });
  
    e.target.reset();
  };


  return (
      <div className="container-1 success-container background">


      <div className="elements">
          <div className="square sq1"></div>
          <div className="square sq2"></div>
          <div className="square sq3"></div>
      </div> 
      <div className="above-background contact-page ">
    <div className="contact-info">
      <div className="social-links">
        <a href="https://www.facebook.com/your-page" target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
        <a href="https://www.instagram.com/your-page" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </div>
      <p>Telefon: 0765432123</p>
    </div>
    <form className="contact-form" onSubmit={sendEmail}>
      <h1>Contact</h1>
      <input type="text" placeholder="Numele Tau" name="from_name" required />
      <input type="email" placeholder="Adresa ta de Email" name="from_email" required />
      <textarea placeholder="Mesajul" name="message" required></textarea>
      <button type="submit">Trimite</button>
    </form>
    <p>{messageSent}</p>
  </div>
  </div>
  )
}

export default Contact