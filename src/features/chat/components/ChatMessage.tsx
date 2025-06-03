import { motion } from 'motion/react';
import React from 'react';

import type { ChatMessage as ChatMessageType } from '../../chat/hooks/useChatQuery';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  // Convert markdown-like content to HTML
  const createMarkup = () => {
    // Tạo HTML đơn giản từ nội dung Markdown
    const html = message.message
      // Hỗ trợ heading
      .replace(/### (.*)/g, '<h3 class="font-bold text-lg mt-3 mb-1">$1</h3>')
      .replace(/## (.*)/g, '<h2 class="font-bold text-xl mt-4 mb-2">$1</h2>')
      .replace(/# (.*)/g, '<h1 class="font-bold text-2xl mt-4 mb-2">$1</h1>')
      // Hỗ trợ bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Hỗ trợ italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Hỗ trợ links      // Hỗ trợ images
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<strong>Ảnh minh họa: </strong> <img src="$2" alt="$1" class="my-2 max-h-40 rounded-md" />')
      // Hỗ trợ list
      .replace(/- (.*)/g, '<li class="ml-4">$1</li>')
      // Hỗ trợ horizontal rule
      .replace(/---/g, '<hr class="my-3 border-gray-300" />')
      // Convert newlines to <br>
      .replace(/\n/g, '<br />');
    
    return { __html: html };
  };
  
  return (
    <div
      className={
        isUser
          ? 'mb-2 flex justify-end'
          : 'mb-2 flex justify-start'
      }
      aria-live="polite"
    >
      <motion.div
        initial={isUser ? { opacity: 0, x: 24 } : { opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, type: 'spring' }}
        className={
          isUser
            ? 'max-w-xs rounded-lg bg-black px-4 py-2 text-white shadow-md'
            : 'max-w-md rounded-lg bg-gray-200 px-4 py-2 text-gray-900 shadow-md'
        }
        tabIndex={0}
        aria-label={isUser ? 'Tin nhắn của bạn' : 'Tin nhắn từ bot'}
      >
        {isUser ? (
          message.message
        ) : (
          <div dangerouslySetInnerHTML={createMarkup()} />
        )}
      </motion.div>
    </div>
  );
}; 