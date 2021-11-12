import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext.js';
import CartContext from '../../contexts/CartContext.js';
import { addToCart } from '../../services/bootstore.js';
import { useHistory } from 'react-router-dom';
import { 
    BsFillCartPlusFill as AddToCartIcon, 
    BsCartCheckFill as AddedToCartIcon
} from 'react-icons/bs';

export default function Product ({ product, rating }) {
    const { user } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);
    const history = useHistory();

    function addProductToCart (event) {
        event.stopPropagation();

        const body = {
            code: Number(product.code),
            quantity: 1,
        }

        const newCart = cart ? [...cart, body] : [body];

        if (user?.token) {
            addToCart(user.token, body)
                .then(() => setCart(newCart))
                .catch(() => alert("Ocorreu algum erro! Tente novamente!"));
        } else {
            setCart(newCart);
            localStorage.setItem('cart',JSON.stringify(newCart));
        }
    }

    return (
        <ProductBox onClick={() => history.push(`/products/${product?.code}`)}>
            <ImageBox>
                <img src={product?.image} alt={product?.name} />
            </ImageBox>
            <Name>{product?.name}</Name>
            <Rating>
                <StarRatings 
                    rating={rating?.average || 0} 
                    numberOfStars={5} 
                    starRatedColor='#F2C832' 
                    starEmptyColor='#CCCCCC' 
                    starDimension='15px' 
                    starSpacing='1px'
                />
                <span>{rating?.quantity || 0} avaliações</span>
            </Rating>
            <Price>{Number(product?.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Price>
            <AddButton onClick={cart?.some((item) => Number(item.code) === Number(product.code)) ? (event) => event.stopPropagation() : addProductToCart} added={cart?.some((item) => Number(item.code) === Number(product.code))}>
                {cart?.some((item) => Number(item.code) === Number(product.code)) ? <AddedToCartIcon style={{ color: '#FFFFFF', fontSize: '20px' }} /> : <AddToCartIcon style={{ color: '#FFFFFF', fontSize: '20px' }} />}
            </AddButton>
        </ProductBox>
    );
}

const ProductBox = styled.li`
    border-right: 1px solid #E5E5E5;
    padding: 25px 20px;
    cursor: pointer;
    position: relative;
`;

const ImageBox = styled.div`
    height: 300px;
    display: flex;
    justify-content: center;
    margin-bottom: 5px;
    overflow: hidden;

    & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

const Name = styled.h2`
    height: 30px;
    font-size: 14px;
    color: #666666;
    margin-bottom: 15px;
`;

const Rating = styled.div`
    width: 100%;

    & span {
        font-size: 12px;
        margin-left: 3px;
        color: #CCCCCC;
    }
`;

const Price = styled.h3`
    font-size: 20px;
    font-weight: 700;
    color: #333333;
    margin-top: 20px;
`;

const AddButton = styled.button`
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 3px;
    background-color: ${({ added }) => added ? '#4CBB17' : '#F80032'};
    position: absolute;
    bottom: 25px;
    right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    :hover {
        filter: brightness(${({ added }) => added ? 1 : 0.8});
    }
`;