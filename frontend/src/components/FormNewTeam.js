import React, { useState, useEffect } from "react";
import { getPlayers } from "../utils/apicalls";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
} from "reactstrap";

const FormNewTeam = () => {
  const [players, setPlayers] = useState([]); // Lista de jugadores
  const [selectedPlayers, setSelectedPlayers] = useState([]); // Jugadores seleccionados
  const [search, setSearch] = useState(""); // Valor de búsqueda
  const [nombreEquipo, setNombreEquipo] = useState(""); // Nombre del equipo
  const [staff, setStaff] = useState([]); // Lista del cuerpo técnico
  const [selectedStaff, setSelectedStaff] = useState([]); // Miembros del cuerpo técnico seleccionados
  const [searchStaff, setSearchStaff] = useState(""); // Valor de búsqueda para el cuerpo técnico
  const [searchStaffType, setSearchStaffType] = useState(''); // Valor de búsqueda para el tipo de cuerpo técnico

  useEffect(() => {
    // Realizar la llamada a la API para obtener los jugadores
    getPlayers()
      .then((data) => {
        // Actualizar el estado con los datos de los jugadores
        setPlayers(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching players:", error);
      });
  }, []); // Ejecutar solo una vez al montar el componente

  // Función para manejar la selección de jugadores
  const handleSelectPlayer = (player) => {
    setSelectedPlayers([...selectedPlayers, player]);
  };

  // Función para manejar la selección del cuerpo técnico
  const handleSelectStaff = (member) => {
    setSelectedStaff([...selectedStaff, member]);
  };

  // Función para manejar la búsqueda
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // Función para manejar la búsqueda del cuerpo técnico
  const handleSearchStaff = (event) => {
    setSearchStaff(event.target.value);
  };

  // Función para manejar la búsqueda del tipo de cuerpo técnico
  const handleSearchStaffType = (event) => {
    setSearchStaffType(event.target.value);
  };

  return (
    <Container>
      <Row>
        <h3>Datos del equipo</h3>
        <hr />
        <Col md={4}>
          <FormGroup>
            <Label for="CategoriaEquipo">Categoria del equipo</Label>
            <Input
              id="CategoriaEquipo"
              name="CategoriaEquipo"
              onChange={(e) => setNombreEquipo(e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <h3>Jugadores del equipo</h3>
        <hr />
        <Col>
          <Input
            className="m-2"
            type="text"
            placeholder="Buscar jugadores"
            value={search}
            onChange={handleSearch}
          />
          <Table bordered className="m-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Primer apellido</th>
                <th>Segundo Apellido</th>
                <th>Edad</th>
                <th>Agregar al equipo</th>
              </tr>
            </thead>
            <tbody>
              {players
                .filter((player) => player.name.includes(search))
                .map((player, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{player.name}</td>
                    <td>{player.apellido1}</td>
                    <td>{player.apellido2}</td>
                    <td>{player.edad}</td>
                    <td>
                      <Input
                        type="checkbox"
                        onChange={() => handleSelectPlayer(player)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <h3>Cuerpo técnico del equipo</h3>
        <hr />
        <Col>
          <Input
            className="m-2"
            type="text"
            placeholder="Nombre"
            value={searchStaff}
            onChange={handleSearchStaff}
          />
        </Col>
        <Col md={4}>
          <Input
            className="m-2"
            placeholder="Categoria"
            type="select"
            value={searchStaff}
            onChange={handleSearchStaff}
          />
        </Col>
        <Table bordered className="m-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Tipo de staff</th>
              <th>Seleccionar</th>
            </tr>
          </thead>
          <tbody>
            {staff
              .filter(
                (member) =>
                  member.name.includes(searchStaff) &&
                  member.type.includes(searchStaffType)
              )
              .map((member, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{member.name}</td>
                  <td>
                    <Input
                      type="checkbox"
                      onChange={() => handleSelectStaff(member)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
      <Button>Registrar equipo</Button>
    </Container>
  );
};

export default FormNewTeam;
