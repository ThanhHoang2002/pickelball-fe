import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

import { chatApi, ChatThreadMessage, getChatHistory, sendMessage } from '../api/chatApi';

/**
 * Kiểu dữ liệu tin nhắn dùng trong UI
 */
export type ChatMessage = {
  id: string;
  message: string;
  sender: 'user' | 'bot';
  createdAt: string;
};

const THREAD_ID_KEY = 'chat_thread_id';

export const useChatQuery = () => {
  const queryClient = useQueryClient();
  const [threadId, setThreadId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Load threadId từ localStorage khi mount
  useEffect(() => {
    const savedThreadId = localStorage.getItem(THREAD_ID_KEY);
    if (savedThreadId) setThreadId(savedThreadId);
  }, []);

  // Query để lấy lịch sử chat
  const {
    data: chatHistory = [] as ChatThreadMessage[],
    isLoading: isLoadingHistory,
    isError: isErrorHistory,
    error: historyError,
  } = useQuery<ChatThreadMessage[]>({
    queryKey: ['chatHistory', threadId],
    queryFn: () => (threadId ? getChatHistory(threadId) : Promise.resolve([] as ChatThreadMessage[])),
    enabled: !!threadId,
    staleTime: 5 * 60 * 1000, // 5 phút
  });

  // Chuyển đổi dữ liệu chat history từ API sang dạng ChatMessage
  const messages = chatApi.mapThreadMessageToChatMessage(chatHistory || []);
    
  // Mutation để gửi tin nhắn
  const {
    mutate: sendMessageMutation,
    isPending: isSending,
    isError: isSendError,
    error: sendError,
  } = useMutation({
    mutationFn: ({ message, threadId }: { message: string; threadId?: string }) =>
      sendMessage(message, threadId),
    onMutate: async (newChat) => {
      // Hủy bỏ các queries đang pending để tránh ghi đè optimistic update
      await queryClient.cancelQueries({ queryKey: ['chatHistory', threadId] });
      
      // Lưu trữ state hiện tại để có thể rollback nếu mutation fail
      const previousMessages = queryClient.getQueryData<ChatThreadMessage[]>(['chatHistory', threadId]);
      
      // Tạo tin nhắn optimistic của user
      const optimisticUserMessage: ChatThreadMessage = {
        id: `temp-${Date.now()}`,
        role: 'user',
        content: newChat.message,
        created_at: new Date().toISOString(),
        metadata: {}
      };
      
      // Cập nhật cache của query với optimistic update
      if (previousMessages) {
        queryClient.setQueryData<ChatThreadMessage[]>(
          ['chatHistory', threadId],
          [...previousMessages, optimisticUserMessage]
        );
      } else if (threadId) {
        queryClient.setQueryData<ChatThreadMessage[]>(
          ['chatHistory', threadId],
          [optimisticUserMessage]
        );
      }
      
      // Hiển thị typing indicator
      setIsTyping(true);
      
      // Trả về context để sử dụng trong onError
      return { previousMessages };
    },
    onError: (err, _newChat, context) => {
      // Rollback nếu mutation fail
      if (context?.previousMessages && threadId) {
        queryClient.setQueryData(['chatHistory', threadId], context.previousMessages);
      }
      
      // Ẩn typing indicator
      setIsTyping(false);
      
      // Có thể hiển thị thông báo lỗi ở đây
      console.error('Lỗi khi gửi tin nhắn:', err);
    },
    onSuccess: (data, variables) => {
      // Nếu đây là tin nhắn đầu tiên, lưu thread_id
      if (data.thread_id && !threadId) {
        setThreadId(data.thread_id);
        localStorage.setItem(THREAD_ID_KEY, data.thread_id);
        
        // Khởi tạo cache cho thread mới
        const newUserMessage: ChatThreadMessage = {
          id: `user-${Date.now()}`,
          role: 'user',
          content: variables.message,
          created_at: new Date().toISOString(),
          metadata: {}
        };
        
        queryClient.setQueryData<ChatThreadMessage[]>(
          ['chatHistory', data.thread_id],
          [newUserMessage]
        );
      }
      
      // Chờ một chút để mô phỏng thời gian bot "đánh máy"
      setTimeout(() => {
        // Ẩn typing indicator
        setIsTyping(false);
        
        // Thêm tin nhắn bot vào cache
        const botMessage: ChatThreadMessage = {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: data.message,
          created_at: new Date().toISOString(),
          metadata: { agent: 'bot' }
        };
        
        // Cập nhật cache với tin nhắn mới
        queryClient.setQueryData<ChatThreadMessage[]>(
          ['chatHistory', data.thread_id],
          (old = []) => [...old, botMessage]
        );
        
        // Invalidate để đồng bộ với server data trong lần fetch tiếp theo
        queryClient.invalidateQueries({ queryKey: ['chatHistory', data.thread_id] });
      }, 800); // Đợi 800ms để hiển thị typing indicator
    },
    onSettled: () => {
      // Đảm bảo luôn invalidate sau khi hoàn thành, dù thành công hay thất bại
      if (threadId) {
        queryClient.invalidateQueries({ queryKey: ['chatHistory', threadId] });
      }
    }
  });
    
  // Handlers
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim()) return;
    
    // Gọi mutation để gửi tin nhắn lên server (với optimistic update)
    sendMessageMutation({ 
      message: inputValue,
      threadId: threadId || undefined 
    });
    
    // Clear input
    setInputValue('');
  }, [inputValue, threadId, sendMessageMutation]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSendMessage();
  }, [handleSendMessage]);

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  return {
    // Data
    threadId,
    messages,
    inputValue,
    isOpen,
    isTyping,
    isPending: isSending,
    
    // Loading & Error states
    isLoading: isLoadingHistory || isSending,
    isError: isErrorHistory || isSendError,
    error: historyError || sendError,
    
    // Handlers
    handleOpen,
    handleClose,
    handleInputChange,
    handleSendMessage,
    handleKeyDown,
  };
}; 