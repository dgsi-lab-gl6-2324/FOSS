import { Table } from "reactstrap";
import { useState, useEffect } from "react";
import { getStaff } from "../utils/apicalls";

const TablaStaff = ({tipoStaff}) => {
    const [staff, setStaff] = useState([]);

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
  
  return (
    <Table bordered className="m-4">
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
        {staff.filter((member) => member.type === tipoStaff) // Filtra por tipo de staff
          .map((member) => (
          <tr key={staff.id}>
            <th scope="row">{staff.id}</th>
            <td>{staff.nombre}</td>
            <td>{staff.apellido1}</td>
            <td>{staff.apellido2}</td>
            <td>{staff.team}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablaStaff;