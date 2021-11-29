import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import { searchProduct } from '../../services/bootstore.js';
import { AiOutlineSearch } from 'react-icons/ai';

export default function Search () {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [searching, setSearching] = useState(false);
    const [showingResults, setShowingResults] = useState(false);
    const history = useHistory();

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            setSearching(false);
            window.onscroll = () => {};
            document.activeElement.blur();
        }
    };
    
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    function search (event) {
        setSearchQuery(event.target.value);

        if (event.target.value.length >= 2) {
            setShowingResults(true);
            searchProduct(event.target.value)
                .then((response) => setSearchResult(response.data));
        } else {
            setShowingResults(false);
            setSearchResult([]);
        }
    }

    function redirectSearch(event) {
        event.preventDefault();
        if (searchQuery.length > 0) history.push(`/search/${searchQuery}`);
    }
    
    return (
        <>
            <SearchForm onSubmit={redirectSearch}>
                <SearchInput
                    placeholder="busque aqui seu produto"
                    debounceTimeout={300}
                    value={searchQuery}
                    onChange={(e) => search(e)}
                    onFocus={() => setSearching(true)}
                />
                <SearchIcon onClick={(event) => searching ? redirectSearch(event) : setSearching(true)}/>
                {showingResults && searching ? (<SearchResultsList>
                    <h1>Você está procurando por:</h1>
                    {searchResult.map((result) => <ProductName to={`/products/${result.code}`}>{result.name}</ProductName>)}
                </SearchResultsList>) : ('')}
            </SearchForm>
            {searching ? <SearchingBackground onClick={() => setSearching(false)} /> : ('')}
        </>
    );
}

const SearchForm = styled.form`
    width: 55%;
    color: #666666;
    position: relative;
    z-index: 2;
`;

const SearchInput = styled(DebounceInput)`
    width: 100%;
    height: 45px;
    color: #666666;
    border: none;
    padding-left: 10px;
`;

const SearchIcon = styled(AiOutlineSearch)`
    position: absolute;
    font-size: 35px;
    color: #F80032;
    right: 10px;
    top: 5px;
    cursor: pointer;
`;

const SearchResultsList = styled.div`
    width: 100%;
    height: 150px;
    position: absolute;
    top: 55px;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    padding: 10px 10px 0px;

    h1 {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 10px;
    }
`;

const ProductName = styled(Link)`
    font-size: 15px;
    color: #666666;
    text-decoration: none;
    margin-bottom: 5px;

    :hover {
        text-decoration: underline;
    }
`;

const SearchingBackground = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    position: fixed;
    background-color: black;
    opacity: 0.6;
    overflow: hidden;
    z-index: 1;
`;