import styled from 'styled-components';

export default function Search () {
    return (
        <SearchInput placeholder="busque aqui seu produto" />
    );
}

const SearchInput = styled.input`
    width: 55%;
    height: 45px;
    color: #666666;
    border: none;
    padding-left: 10px;

    ::placeholder {
        color: #666666;
    }
`;