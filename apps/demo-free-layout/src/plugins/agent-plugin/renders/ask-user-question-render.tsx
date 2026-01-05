/**
 * Copyright (c) 2025 Bytedance Ltd. and/or its affiliates
 * SPDX-License-Identifier: MIT
 */

import React, { useState } from 'react';

import { AskUserQuestionTool } from '../tools/ask-user-question';

interface AskUserQuestionArgs {
  question: string;
  options?: string[];
}

interface AskUserQuestionResult {
  success: boolean;
  data?: {
    question: string;
    answer: string;
  };
  error?: string;
}

export const AskUserQuestionRender: React.FC<{
  args: AskUserQuestionArgs;
  result?: AskUserQuestionResult;
}> = ({ args, result }) => {
  if (!args || !args.question) {
    return null;
  }

  const answerText = result?.data?.answer;

  if (answerText) {
    return (
      <div style={{ padding: '8px', backgroundColor: '#f0f9ff', borderRadius: '6px' }}>
        <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
          {args.question}
        </div>
        <div style={{ fontSize: '12px', color: '#0369a1' }}>→ {answerText}</div>
      </div>
    );
  }

  const questionId = args.question;
  const hasOptions = args.options && Array.isArray(args.options) && args.options.length > 0;

  const QuestionCard = () => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
      if (inputValue.trim()) {
        AskUserQuestionTool.answerQuestion(questionId, inputValue.trim());
        setInputValue('');
      }
    };

    return (
      <div style={{ padding: '8px', backgroundColor: '#fef3c7', borderRadius: '6px' }}>
        <div style={{ fontSize: '12px', color: '#92400e', marginBottom: '6px' }}>
          {args.question}
        </div>
        {hasOptions ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {args.options!.map((option, index) => (
              <button
                key={index}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#fff',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
                onClick={() => {
                  AskUserQuestionTool.answerQuestion(questionId, option);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '4px' }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
              placeholder="输入回答..."
              style={{
                flex: 1,
                padding: '4px 8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '12px',
                outline: 'none',
              }}
            />
            <button
              onClick={handleSubmit}
              disabled={!inputValue.trim()}
              style={{
                padding: '4px 12px',
                backgroundColor: inputValue.trim() ? '#3b82f6' : '#e5e7eb',
                border: 'none',
                borderRadius: '4px',
                cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                fontSize: '12px',
                color: inputValue.trim() ? '#fff' : '#9ca3af',
              }}
            >
              提交
            </button>
          </div>
        )}
      </div>
    );
  };

  return <QuestionCard />;
};
