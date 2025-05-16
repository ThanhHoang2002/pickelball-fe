import { useMutation } from "@tanstack/react-query";

import { updateTransfer } from "../api/updateTransfer";

export const useUpdateTransfer = () => {

    const updateTransferMutation = useMutation({
        mutationFn: updateTransfer
    });
    const handleUpdateTransfer = (orderId: number) => {
        updateTransferMutation.mutate(orderId);
    }
    return { handleUpdateTransfer };
}

