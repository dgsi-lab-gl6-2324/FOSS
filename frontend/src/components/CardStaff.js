import React from "react";
import { Button, Card, CardBody, CardTitle } from "reactstrap";

const CardStaff = ({ title, image }) => {
  return (
    <Card
      className="m-3 d-flex flex-column align-items-center"
      style={{ width: "18rem" }}
    >
      <img
        alt="Sample"
        src={image}
        className="img-fluid"
        style={{ maxWidth: "290px", maxHeight: "160px" }} // Establece un máximo de anchura y altura para las imágenes
      />
      <CardBody className="text-center">
        <CardTitle tag="h5">{title}</CardTitle>
        <Button>Ver {title}</Button>
      </CardBody>
    </Card>
  );
};

export default CardStaff;
