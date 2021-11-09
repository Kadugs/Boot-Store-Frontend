import styled from 'styled-components';
import Cart from './Cart.js';
import Search from './Search.js';
import { FaRegUserCircle as UserIcon } from 'react-icons/fa';

export default function Header () {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <HeaderBar>
            <Logo>
                bootstore
            </Logo>
            <Search />
            <Login>
                <UserIcon style={{ fontSize: '45px' }} />
                <p>{user ? `olá, ${user.name.split(' ')[0]}` : 'faça seu login ou cadastre-se'}</p>
            </Login>
            <Cart />
        </HeaderBar>
    );
}

const HeaderBar = styled.header`
    width: 100%;
    height: 100px;
    background-color: #F80032;
    font-family: 'Arial';
    color: #FFFFFF;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const Logo = styled.div`
    font-size: 30px;
    height: 32px;
    font-weight: bold;
    border-top: 4px solid #ffffff;
    border-bottom: 4px solid #ffffff;
    cursor: pointer;
    display: flex;
    align-items: center;
`;

const Login = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;

    p {
        width: 110px;
        margin-left: 5px;
    }
`;