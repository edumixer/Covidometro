import React, { useState, FormEvent, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { useHistory } from "react-router-dom";

import { FaLock } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

import '../styles/pages/create-orphanage.css';

export default function OrphanagesMap() {
  const history = useHistory();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0})

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    
    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  function handleSelectImage(event: ChangeEvent<HTMLInputElement>) {
    if(!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);
    
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(image => {
      data.append('images', image);
    })

    await api.post('orphanages', data);

    alert('Cadastro realizado com sucesso!');

    history.push('/app');
  }


  return (
    <div id="page-create-orphanage">
      <Sidebar />

      {/* <main> */}
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Filtrar informações</legend>
{/* 
            <Map 
              center={[-25.4253832,-49.2690483]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              { position. latitude !== 0 &&  (
                <Marker 
                  interactive={false} 
                  icon={mapIcon} 
                  position={[
                    position.latitude, 
                    position.longitude
                  ]} 
                />
              )}
            </Map> */}

            <div className="input-block">
              <label htmlFor="name">Cidade - Estado</label>
              <input/>
            </div>

            <div className="input-block">
              <label htmlFor="name">Dia da semana</label>
              <input/>
            </div>

            <div className="input-block">
              <label htmlFor="name">Bairro</label>
              <input/>
            </div>
          
            <div className="input-block">
              <label htmlFor="name">Horário de entrada</label>
              <input/>
            </div>

            <div className="input-block">
              <label htmlFor="name">Horário de saída</label>
              <input/>
            </div>

            <div className="input-block">
              <label htmlFor="name">Estabelecimento</label>
              <input/>
            </div>

            {/* <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button 
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                  >
                    Não
                  </button>
              </div>
            </div> */}
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      
        <form onSubmit={handleSubmit} className="recomedation">
          <fieldset>
            <legend>Recomendação</legend>

            <div className="input-block">
              
              <label htmlFor="name">Melhor dia:</label>
              <input/>
              
            </div>

            <div className="input-block">
              <label htmlFor="name">Melhor horário:</label>
              <input/>
            </div>

            <div className="input-block">
              <label htmlFor="name">Risco</label>
              <input/>
            </div>

            <div className="input-block">
              <label htmlFor="name">Melhor estabelecimento</label>
              <input/>
            </div>

            <div className="teste">
              <label htmlFor="name">Casos:</label>
              <input/>
            </div>
            
          </fieldset>
        
          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      {/* </main> */}
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
