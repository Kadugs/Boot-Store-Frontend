import styled from "styled-components";
import { useContext } from 'react';
import CartContext from "../../contexts/CartContext.js";
import { useHistory } from 'react-router-dom';
import { RiShoppingCartLine as CartIcon } from 'react-icons/ri';

export default function Cart () {
    const { cart } = useContext(CartContext);
    const history = useHistory();

    return (
        <CartBox onClick={() => history.push('/cart')}>
            <CartIcon style={{ fontSize: '50px' }}/>
            <CartQuantity>
                {cart?.length || 0}
            </CartQuantity>
        </CartBox>
    );
}

const CartBox = styled.div`
    cursor: pointer;
    position: relative;
`;

const CartQuantity = styled.div`
    background-color: #CD0114;
    position: absolute;
    top: -5px;
    right: -10px;
    padding: 5px;
    border-radius: 50%;
`;