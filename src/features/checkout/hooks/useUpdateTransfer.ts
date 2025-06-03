import { useMutation } from "@tanstack/react-query";

import { updateTransfer, UpdateTransferParams } from "../api/updateTransfer";

export const useUpdateTransfer = () => {
    const updateTransferMutation = useMutation({
        mutationFn: updateTransfer
    });
    
    const handleUpdateTransfer = (params: UpdateTransferParams) => {
        return updateTransferMutation.mutateAsync(params);
    }
    
    return { 
        handleUpdateTransfer,
        isLoading: updateTransferMutation.isPending,
        data: updateTransferMutation.data,
        error: updateTransferMutation.error
    };
}

