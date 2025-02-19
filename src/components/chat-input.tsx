"use client"

import { ArrowUp } from "lucide-react"
import type React from "react"

import { useEffect, useState } from "react"

interface ChatInputProps {
  prompt: string
  setPrompt: React.Dispatch<React.SetStateAction<string>>
  isLoading: boolean
  handleSubmit: () => void
  children?: React.ReactNode
  isTyping: boolean
  suggestedPrompt: string[]
}

const ChatInput: React.FC<ChatInputProps> = ({
  children,
  prompt,
  setPrompt,
  isLoading,
  isTyping,
  suggestedPrompt,
  handleSubmit,
}) => {
  const [shouldSubmit, setShouldSubmit] = useState(false)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSubmit()
    }
  }

  useEffect(() => {
    if (shouldSubmit) {
      handleSubmit()
      setShouldSubmit(false)
    }
  }, [shouldSubmit, handleSubmit])

  const handleQuickPrompt = (value: string) => {
    setPrompt(value)
    setShouldSubmit(true)
  }

  return (
    <>
      {!isTyping && (suggestedPrompt.length > 0 || !children) && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              How can I help you today?
            </h2>
            <p className="text-gray-600">
              Start conversation
            </p>
          </div>
          {suggestedPrompt.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {suggestedPrompt.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickPrompt(prompt)}
                  className="text-left p-4 rounded-xl border border-gray-200 
                  bg-white hover:border-gray-300 hover:shadow-lg hover:-translate-y-0.5
                  transition-all duration-200 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-50 
                  to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-gray-900 font-medium mb-1 relative z-10">
                    {prompt.length > 60 ? prompt.slice(0, 60) + "..." : prompt}
                  </p>
                  <p className="text-sm text-gray-500 relative z-10">
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="flex flex-col gap-2 lg:mx-auto rounded-t-md h-20 bg-white mx-2 place-items-center justify-center z-10 fixed bottom-0 right-0 left-0">
        <div className="flex gap-2 w-full place-items-center justify-center mx-auto px-4">
          {children}
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter question..."
            className="rounded-full w-full md:min-w-2xl max-w-2xl px-6 py-3 h-14 
              border border-gray-200 bg-white text-md sm:text-lg 
              focus:outline-none focus:ring-2 focus:ring-gray-200 
              transition-all shadow-sm"
          />
          <button
            onClick={() => {
              setShouldSubmit(true)
            }}
            disabled={isLoading}
            className={`rounded-full w-14 h-14 flex items-center justify-center
              transition-all ${isLoading ? "bg-gray-100 text-gray-400" : "bg-gray-900 text-white hover:bg-gray-800"}`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <ArrowUp />
            )}
          </button>
        </div>
      </div>
    </>
  )
}

export default ChatInput
