import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';


import '../styles/pages/landing.css';

import logoImg from '../images/logo.svg';
import logoVirus from '../images/virus.png';
import logoVirus_1 from '../images/virus.png';

function Landing() {
    return (
    <div id="page-landing">

      <div className="content-wrapper">
        <img src={logoVirus} alt="Covidômetro" height="270" width="270"/>
        
        
          {/* <p>Visite orfanatos e mude o dia de muitas crianças.</p> */}
        
          {/* <div className="location">
            <strong>Curitiba</strong>
            <span>Paraná</span>
          </div> */}

          <div className="location-covid">
            <strong>Covidômetro</strong>
            <span>A melhor plataforma contra o Covid-19</span>
          </div>

          <div className="location-covid_1">
            <h1>Seja bem vindo</h1>
          </div>
          
          <div className="enter-app_1">
            {/* <Link to="/app" className="enter-app">
              <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
            </Link> */}
            <Link to="/orphanages/create" className="enter-app">
                <FiArrowRight size={32} color="#FFF"/>
            </Link>

            <input type="text" disabled placeholder="Acesse a nossa plataforma"/>
          </div>
          
          <div className="enter-app_2">
            <input type="text" disabled placeholder="Sobre nos"/>
            <button className="enter-app_3">
              <FiArrowRight size={26} color="#FFF" />
            </button>
          </div>

      </div>
    </div>
    );
}

export default Landing;