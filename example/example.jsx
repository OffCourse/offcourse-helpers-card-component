import React from "react";
import Card from "../src/index.jsx";

let model = {
  title: "Bla di Bla",
  user: "Al Dentist",
  followers: 3
};

let schema = ["title", {"meta": ["user", "followers"]}];

class Example extends React.Component {

  render() {
    return (
      <section>
        <Card model={ model } schema={ schema }>
          <p>Hello World</p>
        </Card>
      </section>
    );
  }
}

export default Example;
