import { X, Sparkles, Send, Paperclip, Image, FileText } from 'lucide-react';
import { useState } from 'react';

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export function AIChatDrawer({ isOpen, onClose }: AIChatDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m RMINT AI. I can help you edit your video clips, change descriptions, adjust durations, and more. What would you like to do?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const handleSendMessage = () => {
    if (inputValue.trim() || attachedFiles.length > 0) {
      const newMessage: Message = {
        id: messages.length + 1,
        type: 'user',
        content: inputValue || `Uploaded ${attachedFiles.length} file(s)`,
        timestamp: new Date()
      };
      
      setMessages([...messages, newMessage]);
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          type: 'ai',
          content: 'I understand your request. I can help you make those changes to your video clips. Would you like me to proceed?',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);

      setInputValue('');
      setAttachedFiles([]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachedFiles([...attachedFiles, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer - Opens from RIGHT */}
      <div className={`fixed right-0 top-0 h-full w-[400px] bg-white shadow-2xl z-50 transform transition-transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="h-14 border-b border-gray-200 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#FE5D4D] to-[#ff8577] rounded-lg flex items-center justify-center">
              <Sparkles className="size-4 text-white" />
            </div>
            <h2 className="text-base font-semibold">RMINT AI</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ height: 'calc(100vh - 120px)' }}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-start gap-2 max-w-[85%]">
                {message.type === 'ai' && (
                  <div className="w-7 h-7 bg-gradient-to-br from-[#FE5D4D] to-[#ff8577] rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="size-3.5 text-white" />
                  </div>
                )}
                <div className={`rounded-lg px-3 py-2 ${
                  message.type === 'user' 
                    ? 'bg-[#FE5D4D] text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {message.type === 'user' && (
                  <div className="w-7 h-7 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">
                    D
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-white p-4">
          {/* Attached Files */}
          {attachedFiles.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {attachedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5 text-xs">
                  {file.type.startsWith('image/') ? (
                    <Image className="size-3 text-gray-600" />
                  ) : (
                    <FileText className="size-3 text-gray-600" />
                  )}
                  <span className="text-gray-700 max-w-[120px] truncate">{file.name}</span>
                  <button 
                    onClick={() => removeFile(index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div className="flex items-end gap-2">
            <div className="flex-1 border border-gray-200 rounded-lg focus-within:border-[#FE5D4D] transition-colors">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask RMINT AI to edit your clips..."
                className="w-full px-3 py-2 text-sm resize-none focus:outline-none rounded-lg"
                rows={2}
              />
              <div className="flex items-center justify-between px-2 pb-2">
                <label className="cursor-pointer p-1.5 hover:bg-gray-100 rounded transition-colors">
                  <Paperclip className="size-4 text-gray-500" />
                  <input
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx,.txt"
                  />
                </label>
                <div className="text-xs text-gray-400">
                  Press Enter to send
                </div>
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() && attachedFiles.length === 0}
              className="p-2.5 bg-[#FE5D4D] text-white rounded-lg hover:bg-[#e54d3d] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
            >
              <Send className="size-4" />
            </button>
          </div>
        </div>

        {/* Suggested Prompts */}
        <div className="absolute bottom-[140px] left-4 right-4">
          {messages.length === 1 && (
            <div className="bg-gradient-to-t from-white via-white to-transparent pt-8">
              <p className="text-xs text-gray-500 mb-2">Try asking:</p>
              <div className="space-y-2">
                {[
                  "Change all video durations to 45 seconds",
                  "Update descriptions for videos 1-3",
                  "Assign all videos to Sous Chef",
                  "Add trending hashtags to titles"
                ].map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputValue(prompt)}
                    className="w-full text-left text-xs bg-gray-50 hover:bg-gray-100 rounded-lg px-3 py-2 text-gray-700 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}