import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
const Home = () => {
  return (
    <Container>
      <Link to="/players">
        <Button>PLAYERS</Button>
      </Link>
      <Link to="/teams">
        <Button>TEAMS</Button>
      </Link>
    </Container>
  );
};

export default Home;
