import React, { useState, useEffect } from "react";
import { Table, Container } from "reactstrap";
import { getTeams } from "../utils/apicalls";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

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
      <Table bordered className="m-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <th scope="row">{team.id}</th>
              <td>{team.name}</td>
              <td>{team.category}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/addteam" className="text-decoration-none">
        <Button color="primary">Agregar nuevo equipo</Button>
      </Link>
    </Container>
  );
};

export default Teams;
