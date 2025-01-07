import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlayerDto, PlayerEntity } from '../types';
import { useApi } from '../api/useApi';

export const useCreatePlayerMutation = () => {
    const { apiPost } = useApi();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ['players', 'create'],
        mutationFn: async (payload: PlayerDto) => {
            return apiPost<PlayerEntity, PlayerDto>('players', payload);
        },
        onSuccess: () => [
            queryClient.invalidateQueries({
                queryKey: ['players'],
            }),
        ],
    });

    return {
        mutate,
        isPending,
    };
};
