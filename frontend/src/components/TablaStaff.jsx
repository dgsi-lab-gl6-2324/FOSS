import { Table } from "reactstrap";
import { useState, useEffect } from "react";
import { getStaff, getSingleTeam } from "../utils/apicalls";

const TablaStaff = ({ tipoStaff }) => {
  const [staff, setStaff] = useState([]);
  const [teams, setTeams] = useState({});
  
  useEffect(() => {
    // Realizar la llamada a la API para obtener los jugadores
    getStaff()
      .then((data) => {
        // Actualizar el estado con los datos de los jugadores
        setStaff(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching players:", error);
      });
  }, []); // Ejecutar solo una vez al montar el componente

  useEffect(() => {
    const fetchTeams = async () => {
      const newTeams = {};
      for (const member of staff) {
        if (!teams[member.equipo]) {
          newTeams[member.equipo] = await getSingleTeam(member.equipo);
        }
      }
      setTeams((prevTeams) => ({ ...prevTeams, ...newTeams }));
    };

    fetchTeams();
  }, [staff]);

  return (
    <Table hover bordered className="m-3">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Apellido 1</th>
          <th>Apellido 2</th>
          <th>Age</th>
          <th>Team</th>
        </tr>
      </thead>
      <tbody>
        {staff
          .filter((member) => member.rol === tipoStaff) // Filtra por tipo de staff
          .map((member) => (
            <tr key={member.id}>
              <th scope="row">{member.id}</th>
              <td>{member.nombre}</td>
              <td>{member.apellido1}</td>
              <td>{member.apellido2}</td>
              <td>{member.edad}</td>
              <td>{teams[member.equipo]?.nombre}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default TablaStaff;
