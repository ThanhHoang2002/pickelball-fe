import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

import { ChatMessage } from './ChatMessage';
import { ChatTypingIndicator } from './ChatTypingIndicator';
import { ChatMessage as ChatMessageType } from '../hooks/useChatQuery';

import { Button } from '@/components/ui/button';

type ChatModalProps = {
  isOpen: boolean;
  messages: ChatMessageType[];
  inputValue: string;
  loading: boolean;
  isTyping?: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onNewChat?: () => void;
};

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  messages,
  inputValue,
  loading,
  isTyping = false,
  messagesEndRef,
  onClose,
  onInputChange,
  onSendMessage,
  onKeyDown,
  onNewChat,
}) => {
  const handleNewChat = () => {
    localStorage.removeItem('chat_thread_id');
    if (onNewChat) {
      onNewChat();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-end bg-black/30 backdrop-blur-sm"
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="m-6 w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/10"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.3, type: 'spring', bounce: 0.3 }}
          >
            <div className="flex items-center justify-between bg-black px-4 py-3 text-white">
              <span className="flex items-center gap-2 font-medium">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 21l1.8-4A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Hoang Tu Sport Chatbot
              </span>
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={handleNewChat}
                  aria-label="Tạo đoạn chat mới"
                  tabIndex={0}
                  className="flex items-center gap-1 rounded-full bg-white/20 p-2 text-sm backdrop-blur-sm hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>      
                </motion.button>
                <button
                  onClick={onClose}
                  aria-label="Đóng chat"
                  tabIndex={0}
                  className="rounded-full p-1.5 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="h-96 overflow-y-auto bg-gray-50 px-4 py-3">
              {messages.length === 0 && (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-3 rounded-full bg-gray-200 p-3">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-700">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 21l1.8-4A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-600">Welcome to Hoang Tu Sport Chatbot!</p>
                </div>
              )}
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isTyping && <ChatTypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex items-center gap-2 border-t border-gray-200 bg-white px-4 py-3">
              <input
                type="text"
                className="flex-1 rounded-lg border border-gray-300 bg-white/80 px-3 py-2 text-sm shadow-sm transition-all focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-black/20"
                placeholder="Nhập tin nhắn..."
                value={inputValue}
                onChange={onInputChange}
                onKeyDown={onKeyDown}
                aria-label="Nhập tin nhắn"
                disabled={loading}
              />
              <Button
                onClick={onSendMessage}
                disabled={loading || !inputValue.trim()}
                aria-label="Gửi tin nhắn"
                className="rounded-lg bg-black px-4 py-2 text-white shadow-sm transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:opacity-50"
              >
                Send
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 