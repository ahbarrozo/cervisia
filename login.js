import styled from "styled-components";
import CreateUser from "@/components/CreateUser";
import Login from "@/components/Login";
// import RequestReset from '../components/RequestReset';
// import SignIn from '../components/SignIn';
// import SignUp from '../components/SignUp';

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

export default function LoginPage() {
  return (
    <GridStyles>
      <Login />
      <CreateUser />
      {/*<RequestReset /> */}
    </GridStyles>
  );
}
