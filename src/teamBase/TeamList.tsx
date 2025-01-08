import styled from 'styled-components';
import { SingleTeam } from './SingleTeam';
import { ButtonAddTeam } from './ButtonAddTeam';
import { useState } from 'react';
import { useGetPlayersQuery } from '../queries/useGetPlayersQuery';
import { PlayerEntity, Team, TeamEntity } from '../types';
import { AddTeam } from './AddTeam';
import { useGetTeamQuery } from '../queries/useGetTeamQuery';

const PlayersContainer = styled.div`
    padding: 20px;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 550px;
`;

const Message = styled.p`
    text-align: center;
    font-size: 16px;
    color: #343a40;
`;

const PlayerList = styled.ul`
    list-style: none;
    padding: 0;
`;

export const TeamsList = () => {
    const { data: dataTeam, isFetched } = useGetTeamQuery();
    const { data: dataPlayer } = useGetPlayersQuery();

    const [activButton, isActiveButton] = useState(false);

    if (!isFetched) return <Message>Loading...</Message>;

    if (!dataTeam) return <Message>No data...</Message>;

    const toggleAdd = () => {
        isActiveButton((prevActivButton) => !prevActivButton);
    };

    const teamAndPlayer = (
        teams: TeamEntity[],
        players: PlayerEntity[],
    ): Team[] => {
        return teams.map((team) => {
            const matchedPlayers = players.filter(
                (player) => player.relation === team.teamPlayers,
            );

            return {
                ...team,
                players: matchedPlayers.map((player) => ({
                    id: player.id,
                    name: player.name,
                    surname: player.surname,
                })),
            };
        });
    };

    const teamWithPlayers = dataPlayer
        ? teamAndPlayer(dataTeam, dataPlayer)
        : [];
    return (
        <PlayersContainer>
            <ButtonAddTeam label="Add Team" onClick={toggleAdd} />

            {activButton ? <AddTeam /> : ''}

            <PlayerList>
                {teamWithPlayers.map((team) => (
                    <SingleTeam team={team} key={team.id} />
                ))}
            </PlayerList>
        </PlayersContainer>
    );
};
