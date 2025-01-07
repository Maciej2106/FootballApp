import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlayerDto, PlayerEntity } from '../types';
import { useApi } from '../api/useApi';

export const useUpadtePlayerMutation = (playerId: string) => {
    const { apiPut } = useApi();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['players', 'update', playerId],
        mutationFn: async (payload: PlayerDto) => {
            return apiPut<PlayerEntity, PlayerDto>(
                `players/${playerId}`,
                payload,
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['players'],
            });
        },
    });

    return {
        mutate,
        isPending,
    };
};
