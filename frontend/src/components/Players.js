import React, { useState, useEffect } from "react";
import { Container, Button } from "reactstrap";
import { Link } from "react-router-dom";
import  TablaJugadores from "./TablaJugadores.jsx";
const Players = () => {
  

  return (
    <Container>
      <TablaJugadores/>
      <Link to="/addplayer" className="text-decoration-none">
        <Button color="primary">
          Agregar nuevo jugador
        </Button>
      </Link>
    </Container>
  );
}

export default Players;
