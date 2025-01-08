import { ChangeEvent, FormEvent, useState } from 'react';
import { TeamForm } from './TeamForm';
import { useUpadtePlayerMutation } from '../queries/useUpdatePlayerMutation';
import { useGetPlayersQuery } from '../queries/useGetPlayersQuery';
import { useCreateTeamMutation } from '../queries/useCreateTeamMutation';

export const AddTeam = () => {
    const { mutate, isPending } = useCreateTeamMutation();
    const { data: dataPlayer } = useGetPlayersQuery();
    const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(
        null,
    );
    const { mutate: mutatePlayer } = useUpadtePlayerMutation(
        selectedPlayerId || '',
    );

    const [values, setValue] = useState({
        nameTeams: '',
        year: 2024,
        location: '',
        teamPlayers: 0,
        playerSelect: '',
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value, type } = e.target;
        setValue((prevValues) => ({
            ...prevValues,
            [name]: type === 'number' ? Number(value) : value,
        }));

        if (name === 'playerSelect') {
            setSelectedPlayerId(value);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        mutate(values);

        const selectedPlayer = dataPlayer?.find(
            (user) => user.id === values.playerSelect,
        );

        if (selectedPlayer) {
            mutatePlayer({
                ...selectedPlayer,
                relation: Number(values.teamPlayers),
            });
        }

        console.log('playerSelect', values.playerSelect);
        console.log('teamPlayers', values.teamPlayers);

        setValue({
            nameTeams: '',
            year: 2024,
            location: '',
            teamPlayers: 0,
            playerSelect: '',
        });
    };

    return (
        <TeamForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            isPending={isPending}
            dataPlayer={dataPlayer}
            editForm
        />
    );
};
