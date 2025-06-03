import { motion } from 'framer-motion';
import React from 'react';

export const ChatTypingIndicator: React.FC = () => {
  return (
    <div className="mb-3 flex justify-start">
      <div className="flex max-w-xs items-end space-x-1.5 rounded-t-2xl rounded-br-2xl bg-white px-4 py-3 shadow-md">
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            className="h-2.5 w-2.5 rounded-full bg-black"
            initial={{ y: 0, opacity: 0.5 }}
            animate={{ 
              y: [0, -6, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: dot * 0.15,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}; 