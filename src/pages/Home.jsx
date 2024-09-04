import React, { useState } from 'react';
import "./Home.css";
import divider from "../assets/pattern-divider-desktop.svg";
import dice from "../assets/icon-dice.svg";

function Home() {
  
  const [adviceData, setAdviceData] = useState({ id: null, advice: 'Click Dice to Generate' });
  const [loading, setLoading] = useState(false); 

  
  const fetchAdvice = async () => {
    setLoading(true); 
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json();
      setAdviceData({ id: data.slip.id, advice: data.slip.advice }); 
    } catch (error) {
      console.error('Error fetching advice:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <div className='main'>
        <div className='inner-main'>
          
          <div><p className='advice'>Advice #{adviceData.id || '...'}</p></div>
          
          
          <div className='quote'><p>“{loading ? 'Loading...' : adviceData.advice}”</p></div>
          
          <div className='divider'><img src={divider} alt="Divider" className='divider'/></div>
          
          
          <div className='dice' onClick={fetchAdvice}>
            <img src={dice} alt="Dice" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
