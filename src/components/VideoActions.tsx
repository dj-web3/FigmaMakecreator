import { Edit3, FileText, Trash2, MessageSquare, Sparkles, Paperclip, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface VideoActionsProps {
  videoId: number;
  onRenameClick?: () => void;
}

export function VideoActions({ videoId, onRenameClick }: VideoActionsProps) {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>([]);
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [aiPrompt, setAIPrompt] = useState('');
  const [aiPrompts, setAIPrompts] = useState<Array<{prompt: string, response: string}>>([]);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [commentFiles, setCommentFiles] = useState<File[]>([]);

  const commentRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);

  // Close popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commentRef.current && !commentRef.current.contains(event.target as Node)) {
        setShowCommentInput(false);
      }
      if (aiRef.current && !aiRef.current.contains(event.target as Node)) {
        setShowAIPrompt(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddComment = () => {
    if (comment.trim() || commentFiles.length > 0) {
      setComments([...comments, comment || `Attached ${commentFiles.length} file(s)`]);
      setComment('');
      setCommentFiles([]);
      setShowCommentInput(false);
    }
  };

  const handleSendAIPrompt = () => {
    if (aiPrompt.trim() || attachedFiles.length > 0) {
      const newPrompt = {
        prompt: aiPrompt || `Uploaded ${attachedFiles.length} file(s)`,
        response: 'AI is processing your request for this video clip...'
      };
      setAIPrompts([...aiPrompts, newPrompt]);
      setAIPrompt('');
      setAttachedFiles([]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachedFiles([...attachedFiles, ...Array.from(e.target.files)]);
    }
  };

  const handleCommentFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCommentFiles([...commentFiles, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
  };

  const removeCommentFile = (index: number) => {
    setCommentFiles(commentFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-1 pt-4 relative">
      {/* Edit */}
      <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded cursor-pointer transition-colors">
        <Edit3 className="size-4" />
        <span>Edit</span>
      </button>

      {/* Rename */}
      <button 
        onClick={onRenameClick}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded cursor-pointer transition-colors"
      >
        <FileText className="size-4" />
        <span>Rename</span>
      </button>

      {/* Delete */}
      <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded cursor-pointer transition-colors">
        <Trash2 className="size-4" />
        <span>Delete</span>
      </button>

      <div className="border-t border-gray-200 my-1"></div>

      {/* AI Prompt */}
      <div className="relative" ref={aiRef}>
        <button 
          onClick={() => {
            setShowAIPrompt(!showAIPrompt);
            setShowCommentInput(false);
          }}
          className="flex items-center justify-center p-2 text-gray-500 hover:bg-gray-50 rounded cursor-pointer w-full transition-colors relative"
        >
          <Sparkles className="size-5" />
          {aiPrompts.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#FE5D4D] text-white text-xs rounded-full size-5 flex items-center justify-center">
              {aiPrompts.length}
            </span>
          )}
        </button>

        {/* AI Prompt Input - Positioned Absolutely */}
        {showAIPrompt && (
          <div className="fixed z-50" style={{
            left: `${aiRef.current?.getBoundingClientRect().left}px`,
            top: `${aiRef.current?.getBoundingClientRect().top}px`,
            transform: 'translateX(-100%) translateX(-8px)'
          }}>
            <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-3 w-80">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-br from-[#FE5D4D] to-[#ff8577] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="size-3.5 text-white" />
                </div>
                <h4 className="text-sm font-medium">AI Quick Prompt</h4>
              </div>

              {/* File Upload Area */}
              {attachedFiles.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {attachedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1 text-xs">
                      <span className="text-gray-700 max-w-[120px] truncate">{file.name}</span>
                      <button 
                        onClick={() => removeFile(index)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-start gap-2 mb-2">
                <div className="flex-1">
                  <textarea
                    value={aiPrompt}
                    onChange={(e) => setAIPrompt(e.target.value)}
                    placeholder="Ask AI to modify this clip..."
                    className="w-full text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-[#FE5D4D] resize-none"
                    rows={3}
                    autoFocus
                  />
                </div>
              </div>

              {/* File Upload Button */}
              <label className="inline-flex items-center gap-2 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded cursor-pointer mb-2 transition-colors">
                <Paperclip className="size-4" />
                <span>Attach file</span>
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx,.txt"
                />
              </label>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowAIPrompt(false);
                    setAIPrompt('');
                    setAttachedFiles([]);
                  }}
                  className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendAIPrompt}
                  disabled={!aiPrompt.trim() && attachedFiles.length === 0}
                  className="px-3 py-1 text-xs bg-[#FE5D4D] text-white rounded hover:bg-[#e54d3d] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Send to AI
                </button>
              </div>

              {/* AI Prompt History */}
              {aiPrompts.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200 space-y-3 max-h-48 overflow-y-auto">
                  <p className="text-xs text-gray-500">Previous prompts:</p>
                  {aiPrompts.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center text-white text-[10px] flex-shrink-0">
                          D
                        </div>
                        <p className="text-xs text-gray-700 flex-1">{item.prompt}</p>
                      </div>
                      <div className="flex items-start gap-2 ml-7">
                        <div className="w-5 h-5 bg-gradient-to-br from-[#FE5D4D] to-[#ff8577] rounded-full flex items-center justify-center flex-shrink-0">
                          <Sparkles className="size-2.5 text-white" />
                        </div>
                        <p className="text-xs text-gray-600 flex-1 italic">{item.response}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Comment */}
      <div className="relative" ref={commentRef}>
        <button 
          onClick={() => {
            setShowCommentInput(!showCommentInput);
            setShowAIPrompt(false);
          }}
          className="flex items-center justify-center p-2 text-gray-500 hover:bg-gray-50 rounded cursor-pointer w-full transition-colors relative"
        >
          <MessageSquare className="size-5" />
          {comments.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#FE5D4D] text-white text-xs rounded-full size-5 flex items-center justify-center">
              {comments.length}
            </span>
          )}
        </button>

        {/* Comment Input - Positioned Absolutely */}
        {showCommentInput && (
          <div className="fixed z-50" style={{
            left: `${commentRef.current?.getBoundingClientRect().left}px`,
            top: `${commentRef.current?.getBoundingClientRect().top}px`,
            transform: 'translateX(-100%) translateX(-8px)'
          }}>
            <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-3 w-64">
              {/* Comment Files */}
              {commentFiles.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2">
                  {commentFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1 text-xs">
                      <span className="text-gray-700 max-w-[100px] truncate">{file.name}</span>
                      <button 
                        onClick={() => removeCommentFile(index)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-start gap-2 mb-2">
                <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">
                  D
                </div>
                <div className="flex-1">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-[#FE5D4D] resize-none"
                    rows={3}
                    autoFocus
                  />
                </div>
              </div>

              {/* File Upload for Comments */}
              <label className="inline-flex items-center gap-2 px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded cursor-pointer mb-2 transition-colors">
                <Paperclip className="size-4" />
                <span>Attach file</span>
                <input
                  type="file"
                  multiple
                  onChange={handleCommentFileSelect}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx,.txt"
                />
              </label>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowCommentInput(false);
                    setComment('');
                    setCommentFiles([]);
                  }}
                  className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddComment}
                  disabled={!comment.trim() && commentFiles.length === 0}
                  className="px-3 py-1 text-xs bg-[#FE5D4D] text-white rounded hover:bg-[#e54d3d] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Post
                </button>
              </div>

              {/* Existing Comments */}
              {comments.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200 space-y-2 max-h-40 overflow-y-auto">
                  {comments.map((cmt, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center text-white text-[10px] flex-shrink-0">
                        D
                      </div>
                      <p className="text-xs text-gray-700 flex-1">{cmt}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
