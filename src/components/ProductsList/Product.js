import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import { useHistory } from 'react-router-dom';

export default function Product ({ product, rating }) {
    const history = useHistory();

    return (
        <ProductBox onClick={() => history.push(`/products/${product?.id}`)}>
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
        </ProductBox>
    );
}

const ProductBox = styled.li`
    border-right: 1px solid #E5E5E5;
    padding: 25px 20px;
    cursor: pointer;
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