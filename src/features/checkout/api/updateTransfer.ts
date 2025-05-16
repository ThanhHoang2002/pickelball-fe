import axiosClient from "@/lib/axios-client";

export const updateTransfer = async (orderId: number) => {
    const response = await axiosClient.put(`/orders/${orderId}/update-transfer`);
    return response.data;
};

