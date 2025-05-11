import { motion } from 'motion/react';
import React from 'react';

export const ChatTypingIndicator: React.FC = () => {
  return (
    <div className="mb-2 flex justify-start">
      <div className="flex max-w-xs items-end space-x-1 rounded-lg bg-gray-200 px-4 py-2 text-gray-900 shadow-md">
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            className="h-2 w-2 rounded-full bg-gray-500"
            initial={{ y: 0 }}
            animate={{ 
              y: [0, -5, 0]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: dot * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}; 