// página que renderiza o componente de capítulos
import React from 'react';
import { Capitulos } from '../components/capitulos/Capitulos';
import { Sumario } from '../components/sumario/Sumario';

const EdicaoCompleta = () => {
  return (
    <div>
       <Capitulos />
       
       {/* <Sumario /> */}
    </div>
  );
};

export default EdicaoCompleta;
