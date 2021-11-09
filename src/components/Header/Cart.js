import styled from "styled-components";
import { RiShoppingCartLine as CartIcon } from 'react-icons/ri';

export default function Cart () {
    return (
        <CartBox>
            <CartIcon style={{ fontSize: '50px' }}/>
        </CartBox>
    );
}

const CartBox = styled.div`
    cursor: pointer;
`;