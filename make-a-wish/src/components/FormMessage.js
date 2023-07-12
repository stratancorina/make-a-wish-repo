import React, { useState } from "react";
import DotsNav from "./DotsNav";
import "../Pages.css";
import axios from "axios";
import PoemGenerator from "../scripts/PoemGenerator";
import useFormContext from "../hooks/useFormContext";

const FormMessage = () => {
const { data , handleChange, setData } = useFormContext();

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [selectedMessage, setSelectedMessage] = useState("");
  const [generatedPoem, setGeneratedPoem] = useState("");
  const [infoMessage, setInfoMessage] = useState('');
  const handleGeneratedPoem = (poem) => {
    setGeneratedPoem(poem);
    console.log(poem)
  };
  const [selectedOption, setSelectedOption] = useState(null);

  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const selectPoem = (option) => {
    if (option === 1) {
      if(userMessage=='') {
        setInfoMessage("Scrie un mesaj.");

      }else {
        setSelectedMessage(userMessage);
        setInfoMessage("Ai selectat optiunea 1. Poti trece la pasul urmator.")
        setData((prevData) => ({
          ...prevData,
          message: userMessage
        }));
        return setOption1;
      }

    } else if (option === 2) {
      // setInfoMessage("Ai selectat optiunea 2")
      if(response==''){
        setInfoMessage("Genereaza un mesaj");
  
        } else {
          setSelectedMessage(generatedPoem);
          setInfoMessage("Ai selectat optiunea 2. Poti trece la pasul urmator.");
          setData((prevData) => ({
            ...prevData,
            message: response
          }));
        }

      return setOption2;
    } else if (option === 3) {
      if(generatedPoem==''){
      setInfoMessage("Genereaza o poezie");

      } else {
        setSelectedMessage(generatedPoem);
        setInfoMessage("Ai selectat optiunea 3. Poti trece la pasul urmator.");
        setData((prevData) => ({
          ...prevData,
          message: generatedPoem
        }));
      }
      return setOption3;

    }
  
    return '';
  };

  console.log(data.message)

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    const question = `Vreau un mesaj frumos de felicitare cu ocazia ${data.surpriseReason} pentru ${data.receiverFirstName} care implineste ${data.receiverAge}, de la ${data.senderFirstName}. Afiseaza doar mesajul si la urma scrie cu drag de la  ${data.senderFirstName}. `;

    try {
      const response = await axios.post("http://localhost:3001/api/ask-question", { question });
      setResponse(response.data.response);
    } catch (error) {
      // Handle error if the request fails
    } finally {
      setLoading(false); // Set loading state back to false after the request is completed
    }
  };

  return (
        <div className="personal-form" >
          <div className="inherit-width">
            <h2 className="form-title">Mesajul de felicitare</h2>
            <div className="form-info-suggestion insert-animation">
              Alege unul dintre cele 3 metode de compunere a unui mesaj. Acest pas este foarte important pentru a transmite un mesaj personalizat catre persoana draga.
                </div>

            <div className="message-options">
              <button className={selectedOption === 1 ? 'button-for-message-active' : 'button-for-message-disabled'} disabled={selectedOption === 1} onClick={() => handleOptionClick(1)}>1. Insereaza propriul mesaj de felicitare:</button>
              <button  className={selectedOption === 2 ? 'button-for-message-active' : 'button-for-message-disabled'} disabled={selectedOption === 2} onClick={() => handleOptionClick(2)} > 2. Foloseste un instrument AI pentru generarea unui mesaj:</button>
              <button  className={selectedOption === 3 ? 'button-for-message-active' : 'button-for-message-disabled'} disabled={selectedOption === 3} onClick={() => handleOptionClick(3)}> 3. Foloseste algoritmul nostru de creare a unei poezii personalizate</button>
            </div>
            <div className="message-options">
            <div  className="option-for-message" style={{ opacity: selectedOption === 1 ? 1 : 0.5 }}>
            <div>
                <label>
                  <textarea
                    rows="4" 
                    cols="70" 
                    // type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    disabled={selectedOption === 2 || selectedOption === 3}
                  />
                </label>
              </div>
            <button type="button" className="button-purple prpl-bottom" onClick={() => {selectPoem(1)}} disabled={selectedOption != 1}>Selecteaza</button>

            </div>

            <div className="option-for-message" style={{ opacity: selectedOption === 2 ? 1 : 0.5 }}>
              
            <div >  
                <label>
                  {/* onSubmit={handleQuestionSubmit} */}
                  Pentru cine: 
                  <input
                    type="text"
                    value={data.receiverFirstName}
                    // onChange={(e) => setCelebratedName(e.target.value)}
                    readOnly
                    disabled={selectedOption === 1 || selectedOption === 3}
                  />
                </label>
                <label>
                  De la cine:
                  <input
                    type="text"
                    value={data.senderFirstName}
                    // onChange={(e) => setYourName(e.target.value)}
                    readOnly
                    disabled={selectedOption === 1 || selectedOption === 3}
                  />
                </label>
                <label>
                Varsta pe care o implineste:
                  <input
                    type="number"
                    value={data.receiverAge}
                    disabled={selectedOption === 1 || selectedOption === 3}
                  />
                </label>
                <label>
                  Gen:
                  <select value={data.receiverGender} readOnly>
                    <option value="">-- Selecteaza --</option>
                    <option value="female">Feminin</option>
                    <option value="male">Masculin</option>
                  </select>
                </label>
                <div className="prpl-wrapper">
                <button className="button-purple" 
                onClick={handleQuestionSubmit} 
                disabled={selectedOption != 2}>
                  {loading ? 'Se incarca...' : 'Genereaza un mesaj'}
                </button>
                </div>

              </div>
              {response && (
                <div className="generated-message">
                  <p>{response}</p>{" "}
                </div>
              )}
            <button type="button" className="button-purple prpl-bottom" onClick={() => {selectPoem(2)}} disabled={selectedOption != 2}>Selecteaza</button>

            </div>

            <div className="option-for-message" style={{ opacity: selectedOption === 3 ? 1 : 0.5 }}>
            <div >
            <PoemGenerator name1={data.receiverFirstName} name2={data.senderFirstName} gender={data.receiverGender} age={data.receiverAge} handleGeneratedPoem={handleGeneratedPoem} dis={selectedOption != 3} />
              </div>

           <button type="button" className="button-purple prpl-bottom" onClick={() => {selectPoem(3)}} disabled={selectedOption != 3}>Selecteaza</button>

            </div>



            </div>
              <div className="form-info-suggestion isert-animation info-messg">{infoMessage}</div>
          </div>
        </div>

  );
};

export default FormMessage;
