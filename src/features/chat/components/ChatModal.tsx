import { motion, AnimatePresence } from 'motion/react';
import React from 'react';

import { ChatMessage } from './ChatMessage';
import { ChatTypingIndicator } from './ChatTypingIndicator';
import { ChatMessage as ChatMessageType } from '../hooks/useChatQuery';

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
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-end bg-black/30"
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
            className="m-6 w-full max-w-md rounded-xl bg-white shadow-2xl ring-1 ring-black/10"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.3, type: 'spring' }}
          >
            <div className="flex items-center justify-between border-b px-4 py-2">
              <span className="font-semibold text-gray-800">Chat hỗ trợ</span>
              <button
                onClick={onClose}
                aria-label="Đóng chat"
                tabIndex={0}
                className="rounded p-1 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="h-96 overflow-y-auto bg-gray-50 px-4 py-2">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isTyping && <ChatTypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex items-center gap-2 border-t bg-white px-4 py-2">
              <input
                type="text"
                className="flex-1 rounded border px-3 py-2 text-sm focus:border-black focus:outline-none"
                placeholder="Nhập tin nhắn..."
                value={inputValue}
                onChange={onInputChange}
                onKeyDown={onKeyDown}
                aria-label="Nhập tin nhắn"
                disabled={loading}
              />
              <button
                onClick={onSendMessage}
                disabled={loading || !inputValue.trim()}
                className="rounded bg-black px-4 py-2 font-semibold text-white shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
                aria-label="Gửi tin nhắn"
                tabIndex={0}
              >
                Gửi
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 