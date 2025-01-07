import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ButtonBody } from './backgroundBody/ButtonBody';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Players } from './playerBase/Players';

const queryClient = new QueryClient();

const GlobalStyle = createGlobalStyle`
body{
background-color: ${(props) => props.theme.colors.background}
}
`;

const Container = styled.div`
    display: flex;
    gap: 30px;
`;

export const App = () => {
    const [isLight, setLight] = useState(true);

    const light = {
        colors: {
            primary: '0333EE',
            textPrimary: '#fff',
            background: '#eee',
            textBackground: '#333',
        },
    };

    const dark = {
        colors: {
            primary: '0333EE',
            textPrimary: '#222',
            background: '#333',
            textBackground: '#eee',
        },
    };

    const toggleTheme = () => {
        setLight((prevLight) => !prevLight);
    };

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={isLight ? light : dark}>
                    <ButtonBody label="Change body" onClick={toggleTheme} />
                    <GlobalStyle />
                    <Container>
                        <Players />
                    </Container>
                </ThemeProvider>
            </QueryClientProvider>
        </>
    );
};
