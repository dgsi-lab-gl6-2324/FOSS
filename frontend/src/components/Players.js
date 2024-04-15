import React, { useState, useEffect } from "react";
import { 
  Table,
  Container 
} from "reactstrap";
import { getPlayers } from "../utils/apicalls";

const Players = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Realizar la llamada a la API para obtener los jugadores
    getPlayers()
      .then((data) => {
        // Actualizar el estado con los datos de los jugadores
        setPlayers(data);
      })
      .catch((error) => {
        console.error("Error fetching players:", error);
      });
  }, []); // Ejecutar solo una vez al montar el componente

  return (
    <Container>
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <th scope="row">{player.id}</th>
              <td>{player.firstName}</td>
              <td>{player.lastName}</td>
              <td>{player.age}</td>
              <td>{player.team}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Players;
