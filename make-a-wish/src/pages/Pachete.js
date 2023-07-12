import React from 'react';
import '../Pages.css';
import PachetComponent from '../components/Package';


function Pachete() {
    return (
        <div className='container-1 success-container background'>


            
      <div className="elements">
          <div className="square sq1"></div>
          <div className="square sq2"></div>
          <div className="square sq3"></div>
      </div> 
      <div className='above-background pachete-container-wrapper'>

            <h1 className='title1'>Pachete</h1>
            <div className='pachete-container'>
                <PachetComponent
                    imageUrl={process.env.PUBLIC_URL + `/images/pachete/pachet3.jpg`}
                    title="Pachet 1"
                    description="Tort si buchet de flori"
                    price="100"
                    titleAbove={true}
                />
                <PachetComponent
                    imageUrl={process.env.PUBLIC_URL + `/images/pachete/pachet2.jpg`}
                    title="Pachet 2"
                    description="Tort, buchet de flori si sampanie"
                    price="200"
                    titleAbove={true}
                />
                <PachetComponent
                    imageUrl={process.env.PUBLIC_URL + `/images/pachete/pachet1.jpg`}
                    title="Pachet 3"
                    description="Tort, buchet de flori si cos cu fructe"
                    price="300"
                    titleAbove={true}
                />
            </div>
      </div>

        </div>
    );
}

export default Pachete;
