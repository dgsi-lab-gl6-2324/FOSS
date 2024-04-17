import React from 'react';
import CardStaff from './CardStaff';
import cuerpoTecnico from '../images/cuerpo-tecnico.jpg';
import entrenador from '../images/entrenador.jpg';
import directiva from '../images/directiva.jpg';
import { Container } from 'reactstrap';

const Staff = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center flex-wrap mt-5">
      <CardStaff image={entrenador} title="Entrenadores" />
      <CardStaff image={cuerpoTecnico} title="Otro cuerpo técnico" />
      <CardStaff image={directiva} title="Directiva" />
    </Container>
  );
};

export default Staff;
