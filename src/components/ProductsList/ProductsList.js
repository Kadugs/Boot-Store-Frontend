import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { getProductsList } from '../../services/bootstore.js';
import { getRatings } from '../../services/bootstore.js';
import Header from '../Header/Header.js';
import Product from './Product.js';

export default function ProductsList () {
    const [products, setProducts] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [orderBy, serOrderBy] = useState("visits");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProductsList(orderBy)
            .then((response) => setProducts(response.data))
            .catch((error) => alert('Ocorreu algum erro! Tente novamente'));
    }, [orderBy]);

    useEffect(() => {
        getRatings()
            .then((response) => setRatings(response.data))
            .catch((error) => alert('Ocorreu algum erro! Tente novamente'));
    }, []);

    return (
        <>
            <Header />
            <Container>
                <ProductsGrid>
                    {products.map((product) => <Product key={product.code} product={product} rating={ratings.find((rating) => rating.productCode === product.code)} loading={loading} setLoading={setLoading} />)}
                </ProductsGrid>
            </Container>
        </>
    );
}

const Container = styled.section`
    width: 100%;
`;

const ProductsGrid = styled.ul`
    width: 90%;
    max-width: 1500px;
    display: grid;
    grid-template-columns: repeat(4, 25%);
    row-gap: 30px;
    margin: 50px auto;

    li:nth-child(4n), li:last-child {
        border: none;
    }
`;