import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        style={{
          float: "left",
          width: 400,
          marginRight: 10,
          marginLeft: 22,
          borderRadius: 2,
        }}
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeHolder="Search Products..."
      ></Form.Control>
      <Button
        type="submit"
        variant="outline-success"
        className="p-1.5 "
        style={{ borderRadius: 3 }}
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
