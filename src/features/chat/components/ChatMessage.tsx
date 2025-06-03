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
    // Xử lý theo thứ tự để tránh xung đột
    let html = message.message;
    
    // 1. Thay thế tất cả các newlines bằng placeholder tạm thời
    // để tránh ảnh hưởng đến các regex khác
    html = html.replace(/\n/g, '{{NEWLINE}}');
    
    // 2. Xử lý headings
    html = html
      .replace(/### (.*)/g, '<h3 class="font-bold text-lg mt-3 mb-1">$1</h3>')
      .replace(/## (.*)/g, '<h2 class="font-bold text-xl mt-4 mb-2">$1</h2>')
      .replace(/# (.*)/g, '<h1 class="font-bold text-2xl mt-4 mb-2">$1</h1>');
    
    // 3. Xử lý các định dạng văn bản
    html = html
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/- (.*)/g, '<li class="ml-4">$1</li>')
      .replace(/---/g, '<hr class="my-3 border-gray-300" />');
    
    // 4. Xử lý ảnh - sử dụng định dạng ![alt](url)
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, 
      '<div class="image-container"><strong>Ảnh minh họa: </strong><img src="$2" alt="$1" class="my-2 max-h-40 rounded-md" /></div>');
    
    // 5. Xử lý links trong markdown - sử dụng định dạng [text](url)
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, 
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">$1</a>');
    
    // 6. Xử lý URLs thông thường (chú ý không xử lý URLs trong href hoặc src)
    // Tìm và thay thế các URLs đứng riêng lẻ
    const urlPattern = /(https?:\/\/[^\s"'<>]+)/g;
    html = html.replace(urlPattern, (match) => {
      // Kiểm tra xem URL đã nằm trong thẻ a hoặc img chưa
      // Nếu nằm trong href=" hoặc src=" thì không thay thế
      // Phương pháp kiểm tra đơn giản: nếu URL nằm trong chuỗi href=" hoặc src="
      const beforeUrl = html.substring(0, html.indexOf(match));
      const isInHref = beforeUrl.lastIndexOf('href="') > beforeUrl.lastIndexOf('>');
      const isInSrc = beforeUrl.lastIndexOf('src="') > beforeUrl.lastIndexOf('>');
      
      if (isInHref || isInSrc) {
        return match; // Giữ nguyên URL nếu đã nằm trong thuộc tính
      }
      
      // Nếu không, chuyển đổi thành link
      return `<a href="${match}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800 break-words">${match}</a>`;
    });
    
    // 7. Khôi phục newlines
    html = html.replace(/{{NEWLINE}}/g, '<br />');
    
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
            : 'max-w-md overflow-hidden rounded-lg bg-gray-200 px-4 py-2 text-gray-900 shadow-md'
        }
        tabIndex={0}
        aria-label={isUser ? 'Tin nhắn của bạn' : 'Tin nhắn từ bot'}
      >
        {isUser ? (
          message.message
        ) : (
          <div className="chat-message-content" dangerouslySetInnerHTML={createMarkup()} />
        )}
      </motion.div>
    </div>
  );
}; 