import { Table } from "reactstrap";

const TablaEquipos = ({teams}) => {
  return (
    <Table hover bordered className="m-3">
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
            <th scope="row">{team._id}</th>
            <td>{team.nombre}</td>
            <td>{team.categoria}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablaEquipos;
