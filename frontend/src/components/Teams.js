import React, { useState, useEffect } from "react";
import { Table, Container } from "reactstrap";
import { getTeams } from "../utils/apicalls";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import TablaEquipos from "./TablaEquipos";

const Teams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Realizar la llamada a la API para obtener la lista de equipos
    getTeams()
      .then((data) => {
        // Actualizar el estado con la lista de equipos
        setTeams(data);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
      });
  }, []); // Ejecutar solo una vez al montar el componente

  return (
    <Container>
      <TablaEquipos teams={teams} />
      <Link to="/addteam" className="text-decoration-none">
        <Button color="primary">Agregar nuevo equipo</Button>
      </Link>
    </Container>
  );
};

export default Teams;
