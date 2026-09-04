import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Mic,
  MicOff,
  Bot,
  User,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Info,
  Eye,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { getAdvisorAdvice, type AdvisorResponse, type ConversationTurn } from '@/services/aiAdvisorService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  structuredData?: AdvisorResponse;
}

export default function Advisor() {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const { language, profile, t } = useAppContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechRecognitionRef = useRef<any>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: t('advisor_welcome'),
    },
  ]);

  const quickPrompts = [
    t('advisor_quick_1'),
    t('advisor_quick_2'),
    t('advisor_quick_3'),
  ];

  // Initialize Web Speech API for voice input
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'hi' || language === 'hinglish' ? 'hi-IN' : 'en-IN';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
          handleSend(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      speechRecognitionRef.current = recognition;
    }
  }, [language]);

  const toggleVoiceInput = () => {
    if (!speechRecognitionRef.current) {
      alert(t('advisor_mic_unsupported'));
      return;
    }

    if (isListening) {
      speechRecognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        speechRecognitionRef.current.lang =
          language === 'hi' || language === 'hinglish' ? 'hi-IN' : 'en-IN';
        speechRecognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn('Speech recognition error:', err);
        setIsListening(false);
      }
    }
  };

  const handleSend = async (textToSend?: string) => {
    if (isThinking) return;
    const query = (textToSend || input).trim();
    if (!query) return;

    // Add user message
    const updatedMessages: Message[] = [...messages, { role: 'user', content: query }];
    setMessages(updatedMessages);
    setInput('');
    setIsThinking(true);

    try {
      const history: ConversationTurn[] = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const advice = await getAdvisorAdvice(query, profile, language, history);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: advice.recommendation,
          structuredData: advice,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            language === 'hi'
              ? 'क्षमा करें, सलाह तैयार करने में समस्या आई। कृपया पुनः पूछें।'
              : language === 'hinglish'
              ? 'Sorry, advice generate karne me issue aaya. Please dobara try karein.'
              : 'I apologize, an error occurred while processing your query. Please try again.',
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: t('advisor_welcome'),
      },
    ]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto w-full p-4 relative">
      <div className="flex-1 overflow-y-auto pb-44 space-y-6">
        {/* Dynamic Context Banner */}
        <div className="bg-card border border-border/80 rounded-2xl p-3 text-xs flex flex-wrap gap-2.5 items-center text-muted-foreground justify-between shadow-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-primary flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              {t('advisor_context_label')}
            </span>
            <span className="font-semibold text-foreground bg-background px-2 py-0.5 rounded-md border border-border/60">
              {profile.crop}
            </span>
            <span className="font-semibold text-foreground bg-background px-2 py-0.5 rounded-md border border-border/60">
              {profile.acres} {t('acres')}
            </span>
            <span className="font-semibold text-foreground bg-background px-2 py-0.5 rounded-md border border-border/60">
              {profile.location}
            </span>
            <span className="text-blue-600 font-semibold bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
              {t('advisor_context_weather_rain')}
            </span>
          </div>

          <button
            onClick={handleClearChat}
            className="text-[11px] font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer transition-colors"
            title="Reset Chat"
          >
            <RefreshCw className="w-3 h-3" /> {t('advisor_clear_chat')}
          </button>
        </div>

        {/* Conversation Stream */}
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3.5 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-9 h-9 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-xs">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 sm:p-5 shadow-xs ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-xs'
                    : 'bg-card border border-border text-foreground rounded-tl-xs'
                }`}
              >
                {message.role === 'user' ? (
                  <p className="text-sm sm:text-base leading-relaxed font-medium">
                    {message.content}
                  </p>
                ) : (
                  <div className="space-y-4">
                    {/* Recommendation headline */}
                    <div>
                      {message.structuredData?.source === 'fallback' && (
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                          Offline guidance
                        </p>
                      )}
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        {t('advisor_recommendation')}
                      </h4>
                      <p className="text-sm sm:text-base font-semibold leading-relaxed text-foreground">
                        {message.content}
                      </p>
                    </div>

                    {message.structuredData && (
                      <div className="space-y-3 pt-3 border-t border-border/60 text-xs sm:text-sm">
                        {/* Why / Agronomic logic */}
                        {message.structuredData.why && (
                          <div className="bg-muted/70 p-3.5 rounded-xl border border-border/50">
                            <span className="font-bold text-foreground block mb-1 flex items-center gap-1.5 text-xs text-primary">
                              <Info className="w-3.5 h-3.5" />
                              {t('advisor_why')}
                            </span>
                            <p className="text-foreground/85 leading-relaxed text-xs sm:text-sm">
                              {message.structuredData.why}
                            </p>
                          </div>
                        )}

                        {/* Action Steps */}
                        {message.structuredData.nextActions &&
                          message.structuredData.nextActions.length > 0 && (
                            <div className="space-y-1.5">
                              <span className="font-bold text-foreground block text-xs uppercase tracking-wider text-muted-foreground">
                                {t('advisor_next_actions')}
                              </span>
                              <div className="space-y-1.5">
                                {message.structuredData.nextActions.map((action, i) => (
                                  <div
                                    key={i}
                                    className="flex items-start gap-2 bg-background p-2.5 rounded-lg border border-border/40"
                                  >
                                    <CheckCircle2 className="w-4 h-4 text-chart-1 shrink-0 mt-0.5" />
                                    <span className="text-foreground/90 text-xs sm:text-sm leading-relaxed">
                                      {action}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                        {/* What to Monitor */}
                        {message.structuredData.whatToMonitor &&
                          message.structuredData.whatToMonitor.length > 0 && (
                            <div className="bg-chart-2/10 p-3 rounded-xl border border-chart-2/20 text-xs">
                              <span className="font-bold text-chart-2 block mb-1 flex items-center gap-1">
                                <Eye className="w-3.5 h-3.5" />
                                {t('advisor_what_to_monitor')}
                              </span>
                              <ul className="list-disc list-inside space-y-0.5 text-foreground/80">
                                {message.structuredData.whatToMonitor.map((item, idx) => (
                                  <li key={idx}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                        {/* When to Seek Expert Help */}
                        {message.structuredData.whenToSeekHelp && (
                          <div className="bg-destructive/10 p-3 rounded-xl border border-destructive/20 text-xs flex gap-2 items-start">
                            <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-destructive block mb-0.5">
                                {t('advisor_when_to_seek_help')}
                              </span>
                              <p className="text-foreground/80 leading-relaxed">
                                {message.structuredData.whenToSeekHelp}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {message.role === 'user' && (
                <div className="w-9 h-9 rounded-2xl bg-card border border-border text-foreground flex items-center justify-center shrink-0 shadow-xs">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex gap-3.5 justify-start animate-in fade-in duration-300">
              <div className="w-9 h-9 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-card border border-border rounded-2xl rounded-tl-xs p-4 shadow-xs flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
                <span className="text-xs text-muted-foreground font-medium">
                  {t('advisor_thinking')}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Floating Prompt Bar */}
      <div className="absolute bottom-4 left-4 right-4 max-w-4xl mx-auto space-y-2.5">
        {/* Quick Suggestions */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-2 px-2 no-scrollbar">
          {quickPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handleSend(prompt)}
              className="text-xs bg-card hover:bg-muted border border-border/80 px-3.5 py-2 rounded-xl text-foreground/80 hover:text-foreground whitespace-nowrap transition-colors shadow-xs shrink-0 cursor-pointer font-medium"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="bg-card/95 backdrop-blur-md border border-border rounded-2xl p-2 shadow-lg flex items-center gap-2">
          <button
            type="button"
            onClick={toggleVoiceInput}
            className={`p-2.5 rounded-xl transition-all cursor-pointer ${
              isListening
                ? 'bg-destructive text-destructive-foreground animate-pulse'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
            title={t('advisor_mic_tooltip')}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder={isListening ? t('advisor_listening') : t('advisor_placeholder')}
            className="flex-1 bg-transparent border-none px-2 py-2 text-sm text-foreground focus:outline-none placeholder:text-muted-foreground"
            disabled={isThinking}
          />

          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!input.trim() || isThinking}
            className="bg-primary text-primary-foreground p-2.5 rounded-xl hover:bg-primary/90 transition-all shadow-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
