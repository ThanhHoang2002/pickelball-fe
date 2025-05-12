import { motion } from 'motion/react';
import React from 'react';
import type { DetailedHTMLProps, HTMLAttributes, OlHTMLAttributes, LiHTMLAttributes, AnchorHTMLAttributes, QuoteHTMLAttributes } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

import type { ChatMessage as ChatMessageType } from '../../chat/hooks/useChatQuery';

interface ChatMessageProps {
  message: ChatMessageType;
}

// Custom components for markdown rendering
const markdownComponents = {
  p: (props: DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>) => (
    <p className="mb-2" {...props} />
  ),
  h1: (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
    <h1 className="mb-2 mt-4 text-2xl font-bold" {...props} />
  ),
  h2: (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
    <h2 className="mb-2 mt-4 text-xl font-bold" {...props} />
  ),
  h3: (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => (
    <h3 className="mb-1 mt-3 text-lg font-bold" {...props} />
  ),
  ul: (props: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>) => (
    <ul className="mb-3 list-disc pl-5" {...props} />
  ),
  ol: (props: DetailedHTMLProps<OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>) => (
    <ol className="mb-3 list-decimal pl-5" {...props} />
  ),
  li: (props: DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>) => (
    <li className="ml-4" {...props} />
  ),
  a: (props: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => (
    <a className="text-blue-600 underline hover:text-blue-800" {...props} />
  ),
  blockquote: (props: DetailedHTMLProps<QuoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic" {...props} />
  ),
  code: (props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => (
    <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm" {...props} />
  ),
  pre: (props: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) => (
    <pre className="mb-3 overflow-x-auto rounded bg-gray-100 p-3 font-mono text-sm" {...props} />
  ),
  hr: () => <hr className="my-3 border-gray-300" />,
  img: (props: DetailedHTMLProps<HTMLAttributes<HTMLImageElement> & { src?: string, alt?: string }, HTMLImageElement>) => (
    <div>
      <strong>Ảnh minh họa: </strong>
      <img src={props.src} alt={props.alt} className="my-2 max-h-40 rounded-md" />
    </div>
  ),
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
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
          <ReactMarkdown remarkPlugins={[remarkBreaks]} components={markdownComponents}>
            {message.message}
          </ReactMarkdown>
        )}
      </motion.div>
    </div>
  );
}; 