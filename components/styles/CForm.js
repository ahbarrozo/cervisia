import Form from "react-bootstrap/Form";
import styled from "styled-components";

const CForm = styled(Form)`
  background: var(--secondary, white);
  width: 800px;
  color: var(--primary, black);
  padding: 2rem;
  box-shadow: var(--bs);
  border-radius: 10px;
  -webkit-box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.15);

  h2 {
    font-size: 1.5rem;
    padding-bottom: 2rem;
    color: var(--secondary, white);
  }

  input,
  textarea,
  select {
    background: var(--secondary, white);
    width: 100%;
    border: 0;
    border-bottom: 1px solid var(--offWhite);
  }

  input:focus,
  select:focus,
  textarea:focus {
    background: var(--secondary, white);
    box-shadow: none;
    border-bottom: 2px solid var(--yellow);
  }

  input:valid ~ label,
  textarea:valid ~ label,
  select:valid ~ label {
    top: -10px;
    color: var(--primary, black);
  }

  input:focus ~ label,
  textarea:focus ~ label,
  select:focus ~ label {
    top: -10px;
    color: var(--primary, black);
  }

  input.input > input.input--error,
  textarea.input > textarea.input--error {
    border-color: var(--primary, red);
  }

  .tags {
    list-style: none;
    display: flex;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .tag {
    display: block;
    margin-right: 1rem;
  }

  .tag__choice {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tag__choice > input {
    width: auto;
    right: -0.5rem;
    margin-right: -1rem;
    position: relative;
    z-index: 2;
  }
  .tag__choice > input + label {
    background: var(--tertiary, grey);
    padding: 5px 10px 5px 2rem;
    border-radius: 10px;
  }

  .tag__choice > input:checked + label {
    background: var(--yellow, yellow);
  }

  .reviewer__meta {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .reviewer__stars {
    position: relative;
    display: flex;
    justify-content: center;
  }

  .reviewer__stars > input {
    display: none;
  }

  .reviewer__stars > input:checked ~ label {
    color: var(--yellow, yellow);
  }

  .reviewer__stars > input + label {
    font-size: 0;
  }

  .reviewer__stars > input + label:before {
    content: "★ ";
    font-size: 25px;
  }

  .reviewer__stars > input + label[for="star5"] {
    order: 5;
  }
  .reviewer__stars > input + label[for="star4"] {
    order: 4;
  }
  .reviewer__stars > input + label[for="star3"] {
    order: 3;
  }
  .reviewer__stars > input + label[for="star2"] {
    order: 2;
  }
  .reviewer__stars > input + label[for="star1"] {
    order: 1;
  }

  .reviewer__stars > input + label:hover,
  .reviewer__stars > input + label:hover ~ label,
  .reviewer__stars > label:hover ~ input:checked ~ label {
    color: var(--yellow, yellow);
  }
`;

export default CForm;
