import { useMutation } from "@tanstack/react-query";

import { syncData } from "../api/chatApi";

import { useToast } from "@/hooks/use-toast";

export const useChatSync = () => {
    const { toast } = useToast();
    const { mutate: syncDataMutation, isPending: isSyncing } = useMutation({
        mutationFn: syncData,
        onSuccess: () => {
            toast({
                title: "Đồng bộ dữ liệu thành công",
                description: "Dữ liệu đã được đồng bộ thành công",
            });
        },
        onError: () => {
            toast({
                title: "Đồng bộ dữ liệu thất bại",
                description: "Dữ liệu đã được đồng bộ thất bại",
            });
        },
    });

    return {
        isSyncing,
        syncDataMutation,
    };
};
