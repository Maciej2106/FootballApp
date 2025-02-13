import styled from 'styled-components';

type ButtonProps = {
    label: string;
    onClick: () => void;
};

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const StyledButton = styled.button`
    border: none;
    padding: 10px 20px;
    background-color: #265721;
    color: #e1d4d4;
    border: 3px solid #b5a9a9;
    cursor: pointer;
    transition: box-shadow 0.3s;
    margin-left: 50px;

    &:hover {
        box-shadow: 5px 2px 7px 7px #399b52ed;
    }
`;

const Title = styled.h1`
    color: #343a40;
    margin: 0;
`;

export const ButtonAddTeam = ({ label, onClick }: ButtonProps) => {
    return (
        <Container>
            <Title>Teams</Title>
            <StyledButton onClick={onClick}>{label}</StyledButton>
        </Container>
    );
};
