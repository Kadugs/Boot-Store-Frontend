import styled from "styled-components";
import { Link } from "react-router-dom";
import Form from './Form.js';

export default function SignUp () {
    return (
        <Container>
            <PageTitle>criar seu cadastro</PageTitle>
            <h3>veja seus pedidos de forma fácil, compre mais rápido e tenha uma experiência personalizada :)</h3>
            <Form />
            <BackToSignIn>já tem cadastro? <Link to="/sign-in">entrar</Link></BackToSignIn>
        </Container>
    );
}

const Container = styled.section`
    width: 500px;
    height: 100%;
    color: #666666;
    margin: 50px auto;

    & h3 {
        font-size: 18px;
        text-align: center;
    }
`;

const PageTitle = styled.h2`
    font-size: 36px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 20px;
`;

const BackToSignIn = styled.p`
    font-size: 16px;
    text-align: center;

    & a {
        color: #666666;
        font-weight: 700;
    }
`
