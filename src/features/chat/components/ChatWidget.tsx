import { motion } from 'motion/react';
import React, { useRef, useEffect, useState } from 'react';

import { ChatModal } from './ChatModal';
import { useChatQuery } from '../hooks/useChatQuery';

export const ChatWidget: React.FC = () => {
  const {
    isOpen,
    messages,
    inputValue,
    isLoading,
    isTyping,
    handleOpen,
    handleClose,
    handleInputChange,
    handleSendMessage,
  } = useChatQuery();

  // Ref để scroll xuống cuối danh sách tin nhắn
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // State để theo dõi số lượng tin nhắn, phục vụ việc scroll
  const [prevMessageCount, setPrevMessageCount] = useState(0);
  
  // Scroll xuống cuối khi có tin nhắn mới, typing indicator xuất hiện hoặc modal vừa mở
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      // Chỉ scroll khi có tin nhắn mới hoặc typing indicator xuất hiện
      if (messages.length > prevMessageCount || isTyping) {
        // Sử dụng setTimeout để đảm bảo DOM đã được cập nhật trước khi scroll
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 10);
        
        // Cập nhật số lượng tin nhắn đã thấy
        setPrevMessageCount(messages.length);
      }
    }
  }, [messages, isOpen, isTyping, prevMessageCount]);
  
  // Cập nhật lại prevMessageCount khi đóng và mở lại chat
  useEffect(() => {
    if (isOpen) {
      setPrevMessageCount(messages.length);
    }
  }, [isOpen, messages.length]);

  // Hàm gửi tin nhắn bao bọc để đảm bảo UI được cập nhật ngay
  const handleSendMessageWithUIUpdate = () => {
    // Khi gửi tin nhắn mới, cập nhật ngay prevMessageCount để không trigger scroll thừa
    setPrevMessageCount(prevCount => prevCount + 1);
    
    // Gọi hàm gửi tin nhắn gốc
    handleSendMessage();
    
    // Force scroll xuống cuối ngay sau khi đã thêm tin nhắn mới
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };
  
  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3, type: 'spring' }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-black shadow-lg focus:outline-none focus:ring-2 focus:ring-black"
        aria-label="Mở chat hỗ trợ"
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => { if (e.key === 'Enter' || e.key === ' ') handleOpen(); }}
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 21l1.8-4A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </motion.button>
      <ChatModal
        isOpen={isOpen}
        messages={messages}
        inputValue={inputValue}
        loading={isLoading}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
        onClose={handleClose}
        onInputChange={handleInputChange}
        onSendMessage={handleSendMessageWithUIUpdate}
        onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessageWithUIUpdate(); }}
      />
    </>
  );
}; 