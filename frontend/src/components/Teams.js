import { Table } from "reactstrap";

const Teams = () => {
  return (
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
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>13</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>13</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>13</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default Teams;
