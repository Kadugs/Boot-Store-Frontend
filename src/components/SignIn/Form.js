import styled from "styled-components";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext.js";
import { signIn } from "../../services/bootstore.js";

export default function Form () {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(0);
    const history = useHistory();

    async function logIn (event) {
        event.preventDefault();
        setError(0)
        setLoading(true);

        const body = {
            email,
            password,
        }

        try {
            const response = await signIn(body);
            const user = response.data;
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
            return history.push("/");
        } catch (error) {
            const errorStatus = error.response.status;
            setError(errorStatus);
            return setLoading(false);
        }
    }

    return (
        <SignInForm onSubmit={logIn}>
            <Label>email:</Label>
            <Input 
                type="email" 
                value={email} 
                onChange={(event) => setEmail(event.target.value)} 
                error={error === 404} 
                disabled={loading}
                required 
            />
            {error === 404 ? <Error>Email não encontrado!</Error> : null}
            <Label>senha:</Label>
            <Input 
                type="password" 
                value={password} 
                onChange={(event) => setPassword(event.target.value)} 
                error={error === 401} 
                disabled={loading}
                required 
            />
            {error === 401 ? <Error>Senha incorreta!</Error> : null}
            <Button disabled={loading}>continuar</Button>
        </SignInForm>
    );
}

const SignInForm = styled.form`
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 0 auto 40px;

    & p {
        font-size: 14px;
        text-align: left;
        color: #999999;
        margin-left: 10px;
    }
`;

const Label = styled.label`
    font-size: 14px;
`;

const Input = styled.input`
    width: 100%;
    height: 43px;
    background-color: ${({ disabled }) => disabled ? "#e6e6e6" : "#ffffff"};
    font-size: 14px;
    color: ${({ disabled }) => disabled ? "#5c5c5c" : "#666666"};
    border: 1px solid ${({ error }) => error ? "red" : "#cccccc"};
    padding: 10px;
    margin: 8px 0 25px;
    outline: none;

    :focus {
        ${({ error }) => error ? "" : "border: 1px solid #858585;"}
    }

    ::placeholder {
        color: #b3b3b3;
    }
`;

const Error = styled.span`
    font-size:12px;
    color: red;
    margin-top: -20px;
    margin-bottom: 25px;
`;

const Button = styled.button`
    display: block;
    width: 100%;
    height: 42px;
    background-color: #e60014;
    color: #ffffff;
    font-weight: 700;
    border-radius: 3px;
    border: none;
    cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};
    filter: ${({ disabled }) => disabled ? "brightness(0.8)" : "none"};
    box-shadow: 0px 3px 5px rgb(0 0 0 / 20%);

    :hover {
        ${({ disabled }) => disabled ? "" : "filter: brightness(1.03)"};
    }
`;