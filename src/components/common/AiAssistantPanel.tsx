'use client';

import React, { FC, KeyboardEventHandler, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { useMutation, useQuery } from '@apollo/client/react';

import {
  CREATE_ASSISTANT,
  CREATE_MESSAGE,
  GET_MESSAGE_HISTORY,
  GET_USER_ASSISTANTS,
  UPDATE_ASSISTANT,
} from '@/lib/assistant/operations';
import { AssistantContext, MessageSender } from '@/gql/graphql';
import { Button, Icon, TextArea, toast } from '@/components/ui';
import CrossSVG from '../../../public/icons/cross.svg';

interface ChatMessage {
  id: string;
  text: string;
  role: MessageSender;
}

interface AssistantSummary {
  id: string;
  name: string;
}

const DEFAULT_CONTEXT_PREFERENCES = [
  AssistantContext.InvestorBase,
  AssistantContext.PopularPools,
  AssistantContext.UserPortfolio,
];

const CHAT_TITLE_MAX_LENGTH = 40;

function chatTitleFromMessage(text: string): string {
  const singleLine = text.trim().replace(/\s+/g, ' ');
  return singleLine.length > CHAT_TITLE_MAX_LENGTH
    ? `${singleLine.slice(0, CHAT_TITLE_MAX_LENGTH).trim()}…`
    : singleLine;
}

interface AiAssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AiAssistantPanel: FC<AiAssistantPanelProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<'list' | 'chat'>('list');
  const [assistantId, setAssistantId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    data: assistantsData,
    loading: loadingAssistants,
    refetch: refetchAssistants,
  } = useQuery(GET_USER_ASSISTANTS, {
    skip: !isOpen,
    fetchPolicy: 'network-only',
  });
  const [createAssistant, { loading: creatingAssistant }] = useMutation(CREATE_ASSISTANT);
  const [createMessage, { loading: sendingMessage }] = useMutation(CREATE_MESSAGE);
  const [updateAssistant] = useMutation(UPDATE_ASSISTANT);

  const { data: historyData, loading: loadingHistory } = useQuery(GET_MESSAGE_HISTORY, {
    variables: { assistantId: assistantId ?? '' },
    skip: !assistantId,
    fetchPolicy: 'network-only',
  });

  const assistants: AssistantSummary[] = assistantsData?.getUserAssistants ?? [];
  const currentAssistant = assistants.find(a => a.id === assistantId);

  const startNewChat = async () => {
    try {
      const result = await createAssistant({
        variables: {
          input: { name: 'New chat', contextPreferences: DEFAULT_CONTEXT_PREFERENCES },
        },
      });
      const id = result.data?.createAssistant?.id;
      if (id) {
        await refetchAssistants();
        setAssistantId(id);
        setView('chat');
      }
    } catch {
      toast('Failed to start a new chat', 'error');
    }
  };

  const openChat = (id: string) => {
    setAssistantId(id);
    setView('chat');
  };

  useEffect(() => {
    if (!isOpen || loadingAssistants) return;

    if (assistants.length === 0) {
      startNewChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, loadingAssistants, assistants.length]);

  useEffect(() => {
    setMessages([]);
  }, [assistantId]);

  useEffect(() => {
    if (!historyData?.getMessageHistory) return;

    const chronological = [...historyData.getMessageHistory].reverse();
    const resolved = chronological.map(message => ({
      id: message.id,
      text: message.text,
      role: message.sender,
    }));

    setMessages(resolved);
  }, [historyData]);

  useEffect(() => {
    if (!isOpen) {
      setView('list');
      setAssistantId(null);
      setMessages([]);
      setInputValue('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && view === 'chat') messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, view]);

  const isBusy = creatingAssistant || sendingMessage;
  const isLoadingInitial = loadingAssistants || creatingAssistant || (Boolean(assistantId) && loadingHistory && messages.length === 0);
  const isEmpty = useMemo(() => !isLoadingInitial && messages.length === 0, [isLoadingInitial, messages.length]);

  const sendMessage = async () => {
    const text = inputValue.trim();
    if (!text || !assistantId || isBusy) return;

    const isFirstMessage = messages.length === 0;

    setInputValue('');
    setMessages(prev => [...prev, { id: `pending-${Date.now()}`, text, role: MessageSender.User }]);

    try {
      const result = await createMessage({ variables: { input: { assistantId, text } } });
      const [, aiMessage] = result.data?.createMessage ?? [];
      if (aiMessage) {
        setMessages(prev => [...prev, { id: aiMessage.id, text: aiMessage.text, role: aiMessage.sender }]);
      }

      if (isFirstMessage) {
        updateAssistant({ variables: { input: { id: assistantId, name: chatTitleFromMessage(text) } } })
          .then(() => refetchAssistants())
          .catch(() => {});
      }
    } catch {
      toast('Failed to send message', 'error');
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className={clsx(
        'fixed bottom-24 right-6 z-40 flex w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[70vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl origin-bottom-right tr-d-all',
        isOpen ? 'opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-95'
      )}
    >
      <div className={'flex items-center justify-between gap-2 bg-blue-dark px-5 py-4 text-white'}>
        <div className={'flex items-center gap-2 overflow-hidden'}>
          {view === 'chat' && (
            <button onClick={() => setView('list')} aria-label={'Back to conversations'} className={'shrink-0'}>
              <Icon name={'arrowUp'} className={'size-4 -rotate-90'} />
            </button>
          )}
          <span className={'truncate font-semibold'}>
            {view === 'list' ? 'Conversations' : currentAssistant?.name || 'AI Assistant'}
          </span>
        </div>
        <div className={'flex items-center gap-3 shrink-0'}>
          {view === 'list' && (
            <button onClick={startNewChat} aria-label={'New chat'} disabled={isBusy}>
              <Icon name={'plus'} className={'size-4'} />
            </button>
          )}
          <button onClick={onClose} aria-label={'Close AI assistant'}>
            <CrossSVG className={'size-5'} />
          </button>
        </div>
      </div>

      {view === 'list' && (
        <div className={'flex flex-1 flex-col overflow-y-auto p-2'}>
          {loadingAssistants && <div className={'m-auto text-sm text-grey-dark'}>Loading…</div>}
          {!loadingAssistants && assistants.length === 0 && (
            <div className={'m-auto text-sm text-grey-dark'}>Starting a new chat…</div>
          )}
          {assistants.map(assistant => (
            <button
              key={assistant.id}
              onClick={() => openChat(assistant.id)}
              className={'flex items-center rounded-xl px-3 py-3 text-left text-sm hover:bg-grey-light tr-d-all'}
            >
              {assistant.name}
            </button>
          ))}
        </div>
      )}

      {view === 'chat' && (
        <>
          <div className={'flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4'}>
            {isLoadingInitial && <div className={'m-auto text-sm text-grey-dark'}>Loading…</div>}
            {isEmpty && <div className={'m-auto text-sm text-grey-dark'}>Ask me anything about the platform.</div>}
            {messages.map(message => (
              <div
                key={message.id}
                className={clsx(
                  'max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm',
                  message.role === MessageSender.User
                    ? 'self-end bg-blue-dark text-white'
                    : 'self-start bg-grey-light text-black'
                )}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className={'grid grid-cols-4 items-end gap-2 border-t border-stroke-primary p-3'}>
            <div className={'col-span-3'}>
              <TextArea
                className={'max-h-24'}
                rows={1}
                placeholder={'Type a message…'}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={!assistantId || isBusy}
              />
            </div>
            <Button
              visualType={'quaternary'}
              type={'button'}
              onClick={sendMessage}
              disabled={!assistantId || isBusy || !inputValue.trim()}
            >
              Send
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AiAssistantPanel;
