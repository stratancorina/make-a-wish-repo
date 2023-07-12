import React from 'react';
import '../Pages.css';
import DotsNav from '../components/DotsNav';
import useFormContext from '../hooks/useFormContext';
import "../Pages.css";
import FormInputs from '../components/FormInputs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Comanda = () => {

    const {
      page,
      setPage,
      data,
      title,
      canSubmit,
      disablePrev, 
      disableNext, 
      disableNextButton,
      prevHide,
      nextHide,
      submitHide
    } = useFormContext()
    // console.log(page)
    const navigate = useNavigate();

    const handlePrev = () => setPage(prev => prev-1)
    const handleNext = () => setPage(prev => prev+1)

    const handleSubmit = async (e) => {
      e.preventDefault()
      console.log(data)
      try {
        const response = await axios.post('http://localhost:3001/submit-form', data);
    
        if (response.status === 200) {
          console.log('Form submitted successfully!');
          navigate('/success');

        } else {
          console.error('Error submitting form:', response.statusText);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };
    

  return (
    // <FormProvider>
    <div className='container-1' >
      
        <h1 className='title1'>Comanda</h1>
        <DotsNav/>

        <form className="form-container" onSubmit={handleSubmit}>
        <FormInputs/>
        <div className ="button-container">

        <button className={`button-purple ${prevHide}`} type="button" onClick={handlePrev} disabled={disablePrev}>Inapoi</button>
        <button className={`button-purple ${nextHide}`}  type="button" onClick={handleNext} disabled={disableNextButton()}>Inainte</button>


        <button type="submit" className={`button-purple ${submitHide}`} disabled={!canSubmit}>Plaseaza comanda</button>
        </div>
        </form>


      </div>

  );
}
  
export default Comanda;