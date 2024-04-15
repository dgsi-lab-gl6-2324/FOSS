import React, { useState, useEffect } from "react";
import { Table, Container } from "reactstrap";
import { getTeams } from "../utils/apicalls";

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
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Número de jugadores</th>
            <th>Jugadores</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <th scope="row">{team.id}</th>
              <td>{team.name}</td>
              <td>{team.category}</td>
              <td>{team.players.length}</td>
              <td>
                <ul>
                  {team.players.map((player) => (
                    <li key={player.id}>{player.name}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Teams;
