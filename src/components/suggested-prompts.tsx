import type React from "react"
interface SuggestedPromptsProps {
  prompts: string[]
  onSelect: (prompt: string) => void
}

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ prompts, onSelect }) => {
  const categories = [
    {
      title: "Get Started",
      prompts: prompts.slice(0, 3),
      icon: "✨",
    },
    {
      title: "Popular Examples",
      prompts: prompts.slice(3, 6),
      icon: "🔥",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Welcome! How can I help you today?</h1>
        <p className="text-gray-600">Choose a suggestion below or type your own message</p>
      </div>

      <div className="grid gap-6">
        {categories.map((category) => (
          <div key={category.title} className="space-y-3">
            <h2 className="text-sm font-medium text-gray-600 flex items-center gap-2">
              {category.icon} {category.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {category.prompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => onSelect(prompt)}
                  className="text-left p-4 rounded-xl border border-gray-200 
                    bg-white hover:border-gray-300 hover:shadow-lg 
                    transition-all duration-200 group relative overflow-hidden"
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-gray-50 
                    to-white opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <p className="text-gray-900 font-medium mb-1 relative z-10">
                    {prompt.length > 60 ? prompt.slice(0, 60) + "..." : prompt}
                  </p>
                  <p className="text-sm text-gray-500 relative z-10">Click to try this prompt</p>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SuggestedPrompts

