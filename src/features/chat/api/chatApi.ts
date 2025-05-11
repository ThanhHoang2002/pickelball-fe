import { ChatMessage } from '../hooks/useChatQuery';

import { authStore } from '@/features/auth/stores/authStore';
import axiosChat from '@/lib/axiosChat';

export interface ChatThreadMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
  metadata: {
    user_id?: string;
    agent?: string;
  };
}

export interface SendChatRequest {
  message: string;
  thread_id?: string;
  user_id: string;
  auth_token: string;
}

export interface SourceDocument {
  content: string;
  metadata: Record<string, unknown>;
}

export interface ChatResponse {
  message: string;
  source_documents: SourceDocument[];
  thread_id: string;
}

/**
 * Gửi tin nhắn chat
 * @param message Nội dung tin nhắn
 * @param threadId Thread ID (nếu có)
 */
export const sendMessage = async (message: string, threadId?: string): Promise<ChatResponse> => {
  const currentUser = authStore.getCurrentUser();
  const userId = currentUser?.id.toString() || '1';
  const token = localStorage.getItem('accessToken') || '';
  
  const { data } = await axiosChat.post<ChatResponse>('/chat', {
    message,
    thread_id: threadId,
    user_id: userId,
    auth_token: 'Bearer ' + token,
  });
  
  return data;
};

/**
 * Lấy lịch sử chat theo thread ID
 * @param threadId Thread ID
 */
export const getChatHistory = async (threadId: string): Promise<ChatThreadMessage[]> => {
  const token = localStorage.getItem('accessToken') || '';
  
  const { data } = await axiosChat.get<ChatThreadMessage[]>(`/threads/${threadId}/history`, {
    params: { auth_token: token }
  });
  
  return data;
};

/**
 * Chuyển đổi dữ liệu từ API thành định dạng của UI
 * @param messages Tin nhắn từ API
 */
export const mapThreadMessageToChatMessage = (messages: ChatThreadMessage[]): ChatMessage[] => {
  return messages.map(msg => ({
    id: msg.id,
    message: msg.content,
    sender: msg.role === 'user' ? 'user' : 'bot',
    createdAt: msg.created_at,
  }));
};

/**
 * API client cho các thao tác chat
 */
export const chatApi = {
  sendMessage,
  getChatHistory,
  mapThreadMessageToChatMessage,
}; 