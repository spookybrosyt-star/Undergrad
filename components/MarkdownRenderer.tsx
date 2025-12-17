
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={tomorrow}
              language={match[1]}
              PreTag="div"
              customStyle={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '1rem', padding: '1.5rem' }}
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={`${className} bg-white/10 px-2 py-1 rounded text-sm text-rose-400 font-mono`} {...props}>
              {children}
            </code>
          );
        },
        p: ({ children }) => <p className="mb-6 last:mb-0 leading-relaxed text-neutral-300 font-medium text-lg">{children}</p>,
        ul: ({ children }) => <ul className="list-none ml-2 mb-6 space-y-3 text-neutral-300">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal ml-6 mb-6 space-y-3 text-neutral-300">{children}</ol>,
        li: ({ children }) => (
          <li className="flex gap-3">
             <span className="text-rose-500 mt-1.5">•</span>
             <span>{children}</span>
          </li>
        ),
        h1: ({ children }) => <h1 className="text-4xl font-black mb-10 mt-12 text-white border-b border-white/5 pb-6 tracking-tighter">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl font-black mb-6 mt-12 text-white tracking-tight">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-bold mb-4 mt-10 text-neutral-200">{children}</h3>,
        a: ({ children, href }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-rose-400 hover:text-rose-300 underline decoration-rose-500/30 underline-offset-4 font-bold transition-all">
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-rose-600 pl-8 py-4 my-10 italic text-neutral-400 bg-white/5 rounded-r-2xl font-medium text-xl">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="my-12 border-white/5" />,
        strong: ({ children }) => <strong className="font-black text-white">{children}</strong>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
