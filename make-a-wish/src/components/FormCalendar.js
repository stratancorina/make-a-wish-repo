import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";              // core cs
import { locale, addLocale } from 'primereact/api';     
import "../Pages.css"
import useFormContext from '../hooks/useFormContext';


const FormCalendar = () => {

  const { data, handleChange } = useFormContext();

    const [dateValue, setDateValue] = useState(new Date());
    const [time, setTime] = useState(null);

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const today = new Date();

  const minDate = today;

  const handleDateChange = (e) => {
    const selectedDateValue = e.value;
    const adjustedDateValue = new Date(selectedDateValue.getTime() + (selectedDateValue.getTimezoneOffset() + 24 * 60) * 60000);
    setDateValue(adjustedDateValue);
    setSelectedDate(adjustedDateValue);
    const formattedDateValue = adjustedDateValue.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
    handleChange({ target: { name: 'deliveryDate', value: formattedDateValue } });
  };
  
  
  
  const handleTimeChange = (e) => {
    const selectedTimeValue = e.value;
    setTime(selectedTimeValue);
    setSelectedTime(selectedTimeValue);
    // let formattedTimeValue = null;
    let formattedTimeValue = null;
    if (selectedTimeValue) {
      const time = new Date(selectedTimeValue);
      const hours = time.getHours();
      const minutes = time.getMinutes();
      formattedTimeValue = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
    // const formattedTimeValue = selectedTimeValue ? selectedTimeValue.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null; // Format as "HH:mm" if not null
    handleChange({ target: { name: 'deliveryTime', value: formattedTimeValue } });
  };
  

    addLocale('ro', {
        firstDayOfWeek: 1,
        dayNames: ['Duminica', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata'],
        dayNamesShort: ['dum', 'lun', 'mar', 'mie', 'joi', 'vin', 'sab'],
        dayNamesMin: ['D', 'L', 'M', 'Mr', 'J', 'V', 'S'],
        monthNames: ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
        monthNamesShort: ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Astazi',
        clear: 'Sterge',
        //...
    });
    locale('ro');

    return (
        <div className="personal-form">
            <div className='forms'>
            
            </div>
            <div className='inherit-width'>
            <h2 className="form-title">Alege data livrarii si ora:</h2>
            <div className= "pickers">
            <Calendar className= "calendar-picker" value={selectedDate} minDate={minDate} onChange={handleDateChange} inline />
            <Calendar className= "time-picker" value={selectedTime}  onChange={handleTimeChange} timeOnly />
            </div> 
            </div>

        </div>
    );
};

export default FormCalendar;