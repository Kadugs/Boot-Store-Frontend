import styled from "styled-components";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { signUp } from "../../services/bootstore.js";

export default function Form () {
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [repeatEmail, setRepeatEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    function cpfTyping (event) {
        const newValue = event.target.value;

        if ((typeof(Number(newValue[newValue.length - 1])) === "number" && newValue[newValue.length - 1] !== " " && !isNaN(Number(newValue[newValue.length - 1]))) || newValue === "") {
            setCpf(newValue);
        } else {
            setCpf(cpf);
        }
    }

    async function signUpNewUser (event) {
        event.preventDefault();
        setLoading(true);

        const body = {
            name,
            cpf,
            email,
            repeatEmail,
            password,
            repeatPassword
        }

        try {
            await signUp(body);
            alert("Cadastro criado com sucesso!");
            history.push("/sign-in");
        } catch (error) {
            const { response } = error;
            setLoading(false);
            if (response.status === 409) return alert(`Este ${response.data} já está cadastrado!`);
            if (response.status === 400) return alert("Dados inválidos!");
            if (response.status === 500) return alert("Erro desconhecido! Tente novamente");
            if (!response) return alert("Servidor offline");
        }
    }

    return (
        <SignUpForm onSubmit={signUpNewUser}>
            <Label>nome</Label>
            <Input 
                type="text" 
                maxLength="50" 
                size="35" 
                value={name} 
                onChange={(event) => setName(event.target.value)} 
                disabled={loading}
                required 
            />
            <Label>CPF</Label>
            <Input 
                type="text" 
                placeholder="___.___.___-__" 
                maxLength="11" 
                size="13" 
                value={cpf} 
                onChange={(event) => cpfTyping(event)} 
                error={cpf.length > 0 && cpf.length < 11} 
                disabled={loading}
                required 
            />
            {cpf.length > 0 && cpf.length < 11 ? <Error>Os CPF deve conter 11 cacteres!</Error> : null}
            <Label>email</Label>
            <Input 
                type="email" 
                maxLength="50" 
                size="30" 
                value={email} 
                onChange={(event) => setEmail(event.target.value)} 
                disabled={loading} 
                required 
            />
            <Label>repita o email</Label>
            <Input 
                type="email" 
                maxLength="50" 
                size="30" 
                value={repeatEmail} 
                onChange={(event) => setRepeatEmail(event.target.value)} 
                error={email.length > 0 && email !== repeatEmail} 
                disabled={loading} 
                required 
            />
            {email.length > 0 && email !== repeatEmail ? <Error>Os emails precisam coincidir!</Error> : null}
            <Label>senha</Label>
            <p>precisa ter entre 5 e 16 caracteres</p>
            <Input 
                type="password" 
                maxLength="16" 
                size="16" 
                value={password} 
                onChange={(event) => setPassword(event.target.value)} 
                disabled={loading} 
                required 
            />
            <Label>repita a senha</Label>
            <Input 
                type="password" 
                maxLength="16" 
                size="16" 
                value={repeatPassword} 
                onChange={(event) => setRepeatPassword(event.target.value)} 
                error={password.length > 0 && password !== repeatPassword} 
                disabled={loading} 
                required 
            />
            {password.length > 0 && password !== repeatPassword ? <Error>As senhas precisam coincidir!</Error> : null}
            <Button type="submit" disabled={loading}>criar seu cadastro</Button>
        </SignUpForm>
    );
}

const SignUpForm = styled.form`
    width: 350px;
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 60px auto 50px;

    & p {
        font-size: 14px;
        text-align: left;
        color: #999999;
        margin-left: 10px;
    }
`;

const Label = styled.label`
    font-size: 16px;
    margin-left: 10px;
`;

const Input = styled.input`
    height: 48px;
    background-color: ${({ disabled }) => disabled ? "#e6e6e6" : "#ffffff"};
    font-size: 16px;
    color: ${({ disabled }) => disabled ? "#5c5c5c" : "#333333"};
    border: 1px solid ${({ error }) => error ? "red" : "#999999"};
    border-radius: 8px;
    padding: 16px 15px;
    margin: 8px 0 25px;
    outline: none;

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
    width: 234px;
    height: 48px;
    background-color: #f80032;
    color: #ffffff;
    font-weight: 700;
    border-radius: 3px;
    border: none;
    cursor: ${({ disabled }) => disabled ? "not-allowed" : "pointer"};
    margin: 30px auto 0;
    filter: ${({ disabled }) => disabled ? "brightness(0.8)" : "none"};

    :hover {
        ${({ disabled }) => disabled ? "" : "filter: brightness(0.95)"};
    }
`;