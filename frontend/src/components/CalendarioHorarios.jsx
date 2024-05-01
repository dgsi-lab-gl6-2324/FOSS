import { Container } from 'reactstrap';
import {Calendar, dayjsLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { useState } from 'react';

const CalendarioHorarios = () => {
  
  const localizer = dayjsLocalizer(dayjs);
    
  return (
    <Container className="d-flex justify-content-center mt-5">
      <Calendar 
        style={{ height: 500, width: 800}} 
        localizer={localizer}
      />
    </Container>
  );
};

export default CalendarioHorarios;