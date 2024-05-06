import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import CalendarioHorarios from "./CalendarioHorarios";

const HorarioCampos = () => {
  const [modal, setModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '', description: '', campo: '' });

  const toggle = () => setModal(!modal);

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEvents([...events, newEvent]); // Agrega el nuevo evento a la lista de eventos
    setNewEvent({ title: '', start: '', end: '', description: '', campo: '' }); // Reinicia el estado del nuevo evento
    toggle(); // Cierra el modal
  };

  return (
    <div>
      <h1 className="text-center mb-4">Horario de Campos</h1>
      <CalendarioHorarios setEvents={setEvents} events={events.map(event => ({...event, start: new Date(event.start), end: new Date(event.end)}))} />

      <div className="d-flex justify-content-center">
        <Button className="m-4 me-4" color="primary" onClick={toggle}>Agregar evento</Button>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Agregar Evento</ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            <FormGroup>
              <Label for="title">Título</Label>
              <Input type="text" name="title" id="title" placeholder="Título del evento" value={newEvent.title} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="start">Inicio</Label>
              <Input type="datetime-local" name="start" id="start" value={newEvent.start} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="end">Fin</Label>
              <Input type="datetime-local" name="end" id="end" value={newEvent.end} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="description">Descripción</Label>
              <Input type="textarea" name="description" id="description" placeholder="Descripción del evento" value={newEvent.description} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="additionalInfo">Campo</Label>
              <Input type="text" name="campo" id="campo" placeholder="Campo donde se desarrolla el evento" value={newEvent.campo} onChange={handleChange} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">Agregar</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancelar</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default HorarioCampos;
