import React, { useState } from 'react';
import { Container, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";

const CalendarioHorarios = ({ events, setEvents }) => {
  const localizer = dayjsLocalizer(dayjs);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modal, setModal] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);

  const toggleModal = () => setModal(!modal);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setEditedEvent(event); // Establece el evento seleccionado como el evento editado
    toggleModal();
  };

  const handleEditEvent = () => {
    const updatedEvents = events.map((ev) => {
      if (ev.id === selectedEvent.id) {
        return { ...ev, ...editedEvent };
      }
      return ev;
    });
    setEvents(updatedEvents);
    toggleModal();
  };

  const handleDeleteEvent = () => {
    const updatedEvents = events.filter((ev) => ev.id !== selectedEvent.id);
    setEvents(updatedEvents);
    toggleModal();
  };

  const handleChange = (e) => {
    setEditedEvent({ ...editedEvent, [e.target.name]: e.target.value });
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Calendar
        style={{ height: 500, width: 800 }}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleEventClick}
      />
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Detalles del Evento</ModalHeader>
        <ModalBody>
          {selectedEvent && (
            <Form>
              <FormGroup>
                <Label for="title">Título</Label>
                <Input type="text" name="title" id="title" placeholder="Título" value={editedEvent?.title || ''} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="start">Inicio</Label>
                <Input type="datetime-local" name="start" id="start" value={dayjs(editedEvent?.start).format('YYYY-MM-DDTHH:mm') || ''} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="end">Fin</Label>
                <Input type="datetime-local" name="end" id="end" value={dayjs(editedEvent?.end).format('YYYY-MM-DDTHH:mm') || ''} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="description">Descripción</Label>
                <Input type="textarea" name="description" id="description" placeholder="Descripción" value={editedEvent?.description || ''} onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="campo">Campo</Label>
                <Input type="text" name="campo" id="campo" placeholder="Campo" value={editedEvent?.campo || ''} onChange={handleChange} />
              </FormGroup>
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleEditEvent}>Editar</Button>{' '}
          <Button color="danger" onClick={handleDeleteEvent}>Eliminar</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default CalendarioHorarios;
