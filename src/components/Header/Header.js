import styled from 'styled-components';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/UserContext.js';
import Cart from './Cart.js';
import Search from './Search.js';
import { FaRegUserCircle as UserIcon } from 'react-icons/fa';
import { IoLogOutOutline as SignOutIcon } from 'react-icons/io5';

export default function Header () {
    const { user } = useContext(UserContext);
    const history = useHistory();

    function signOut (event) {
        event.stopPropagation();
        localStorage.removeItem("user");
        return history.push("/sign-in");
    }

    return (
        <HeaderBar>
            <Logo onClick={() => history.push('/')}>
                bootstore
            </Logo>
            <Search />
            <Login onClick={() => user ? null : history.push('/sign-in')}>
                <UserIcon style={{ fontSize: '45px' }} />
                <div>
                    {user ? `olá, ${user.name.split(' ')[0]}` : 'faça seu login ou cadastre-se'}
                    {user ? <SignOutIcon style={{ fontSize: '20px' }} onClick={signOut} /> : null}
                </div>
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

    & div {
        width: 110px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 5px;
    }
`;