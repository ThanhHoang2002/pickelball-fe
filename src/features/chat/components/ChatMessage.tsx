import { motion } from 'motion/react';
import React, { useMemo } from 'react';

import type { ChatMessage as ChatMessageType } from '../hooks/useChatQuery';

interface ChatMessageProps {
  message: ChatMessageType;
}

// Hàm để trích xuất các phần thông tin từ tin nhắn sản phẩm
const extractProductInfo = (content: string) => {
  // Kiểm tra xem có phải tin nhắn sản phẩm không
  if (!content.includes('Dưới đây là') && !content.includes('bán chạy nhất')) {
    return null;
  }

  try {
    // Tách thành từng sản phẩm
    const productMatches = content.match(/\d+\.\s+.*?(?=\d+\.\s+|$)/gs);
    
    if (!productMatches) return null;
    
    const products = productMatches.map(productText => {
      // Lấy tên sản phẩm
      const nameMatch = productText.match(/\*\*(.*?)\*\*/);
      const name = nameMatch ? nameMatch[1] : '';
      
      // Lấy giá
      const priceMatch = productText.match(/\*\*Giá:\*\*\s+(.*?)(?=\n|$)/);
      const price = priceMatch ? priceMatch[1] : '';
      
      // Lấy mô tả
      const descMatch = productText.match(/\*\*Mô tả:\*\*\s+(.*?)(?=\n|$)/);
      const description = descMatch ? descMatch[1] : '';
      
      // Lấy tính năng nổi bật
      const featuresMatch = productText.match(/\*\*Tính năng nổi bật:\*\*\s+(.*?)(?=\n|$)/);
      const features = featuresMatch ? featuresMatch[1] : '';
      
      // Lấy trạng thái
      const statusMatch = productText.match(/\*\*Trạng thái:\*\*\s+(.*?)(?=\n|$)/);
      const status = statusMatch ? statusMatch[1] : '';
      
      // Lấy URL hình ảnh
      const imageMatch = productText.match(/!\[.*?\]\((.*?)\)/);
      const imageUrl = imageMatch ? imageMatch[1] : '';
      
      return {
        name,
        price,
        description,
        features,
        status,
        imageUrl
      };
    });
    
    return {
      introText: content.split('\n\n')[0],
      products,
      outroText: content.split(/\d+\.\s+.*?(?=\d+\.\s+|$)/gs).pop()?.trim() || ''
    };
  } catch (error) {
    console.error('Error parsing product message:', error);
    return null;
  }
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  // Phân tích tin nhắn sản phẩm
  const productData = useMemo(() => {
    if (isUser) return null;
    return extractProductInfo(message.message);
  }, [isUser, message.message]);
  
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
        ) : productData ? (
          <div className="product-message">
            {/* Intro text */}
            <p className="mb-3">{productData.introText}</p>
            
            {/* Products list */}
            <div className="space-y-4">
              {productData.products.map((product, index) => (
                <div key={index} className="product-item rounded border border-gray-300 bg-white p-3">
                  <h3 className="mb-2 flex items-center text-lg font-bold">
                    <span className="mr-2">{index + 1}.</span>
                    <span className="mr-1">🏓</span>
                    {product.name}
                  </h3>
                  
                  <div className="ml-6 space-y-1">
                    {product.price && (
                      <div className="flex items-start">
                        <span className="mr-1">💰</span>
                        <div>
                          <strong>Giá:</strong> {product.price}
                        </div>
                      </div>
                    )}
                    
                    {product.description && (
                      <div className="flex items-start">
                        <span className="mr-1">📝</span>
                        <div>
                          <strong>Mô tả:</strong> {product.description}
                        </div>
                      </div>
                    )}
                    
                    {product.features && (
                      <div className="flex items-start">
                        <span className="mr-1">✨</span>
                        <div>
                          <strong>Tính năng nổi bật:</strong> {product.features}
                        </div>
                      </div>
                    )}
                    
                    {product.status && (
                      <div className="flex items-start">
                        <span className="mr-1">ℹ️</span>
                        <div>
                          <strong>Trạng thái:</strong> {product.status}
                        </div>
                      </div>
                    )}
                    
                    {product.imageUrl && (
                      <div className="mt-2">
                        <img 
                          src={product.imageUrl}
                          alt={`Hình ảnh ${product.name}`}
                          className="mt-1 max-h-48 rounded shadow-sm"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Outro text */}
            {productData.outroText && (
              <p className="mt-3">{productData.outroText}</p>
            )}
          </div>
        ) : (
          <div>
            {message.message.split('\n').map((line, i) => (
              <p key={i} className={i > 0 ? 'mt-2' : ''}>
                {line}
              </p>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}; 