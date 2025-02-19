"use client"

import type React from "react"
import { useState } from "react"
import { Share2, Copy, Facebook, Twitter } from "lucide-react"

interface AiProfileNameProps {
  userProfileName?: string | null
}

const AiProfileName: React.FC<AiProfileNameProps> = ({ userProfileName = "Agent" }) => {
  const [showShare, setShowShare] = useState(false)
  const [copied, setCopied] = useState(false)

  const shareUrl = `https://aiprofile.sbs/${userProfileName}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")
  }

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`, "_blank")
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Chat with ${userProfileName}`,
          url: shareUrl,
        })
      } catch (err) {
        setShowShare(!showShare)
        console.log(err);
      }
    } else {
      setShowShare(!showShare)
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            Chat with {userProfileName || "AI"}
          </h1>
          <div className="relative">
            <button
              onClick={handleShare}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Share profile"
            >
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>

            {showShare && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                <button
                  onClick={handleCopyLink}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? "Copied!" : "Copy link"}
                </button>
                <button
                  onClick={shareToFacebook}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                >
                  <Facebook className="w-4 h-4" />
                  Share to Facebook
                </button>
                <button
                  onClick={shareToTwitter}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                >
                  <Twitter className="w-4 h-4" />
                  Share to X
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AiProfileName

