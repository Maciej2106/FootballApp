import styled from 'styled-components';

type ButtonProps = {
    label: string;
    onClick: () => void;
};

const StyledButton = styled.button`
    border: none;
    padding: 20px;
    min-width: 150px;
    width: 10%;
    background-color: #399b52ed;
    color: rgb(12, 11, 11);
    border: 3px solid #b5a9a9;
    margin: 2% auto;

    &:hover {
        box-shadow: 5px 2px 7px 7px #233467ed;
    }
`;

export const ButtonBody = ({ label, onClick }: ButtonProps) => {
    return (
        <>
            <StyledButton onClick={onClick}>{label}</StyledButton>
        </>
    );
};
