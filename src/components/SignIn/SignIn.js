import styled from "styled-components";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaRegUser as UserIcon } from "react-icons/fa";
import Form from "./Form.js";

export default function SignIn () {
    return (
        <Container>
            <PageTitle>
                <UserIcon style={{ fontSize: "27px" }} />
                login do cliente
            </PageTitle>
            <Form />
            <SignUp>não tem cadastro? <Link to="/sign-up">cadastre-se</Link></SignUp>
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

const PageTitle = styled.div`
    width: 240px;
    font-size: 28px;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    margin: 0 auto 20px;
`;

const SignUp = styled.p`
    font-size: 14px;
    text-align: center;

    & a {
        font-size: 14px;
        color: #666666;
    }
`