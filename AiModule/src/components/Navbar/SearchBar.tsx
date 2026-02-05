import { useState, useEffect, useRef } from 'react'
import { TextField } from '@radix-ui/themes'
import { MagnifyingGlassIcon, ChatBubbleIcon } from '@radix-ui/react-icons'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

// Mock data for AI search results
const mockAiResults = [
  {
    id: 1,
    title: 'Getting Started with Echo Portal',
    description: 'Learn how to set up your first project and configure the essential settings for your workflow.',
    gradient: 'from-orange-400 to-rose-500',
  },
  {
    id: 2,
    title: 'API Integration Guide',
    description: 'Connect your applications using our REST API with comprehensive authentication and endpoint documentation.',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    id: 3,
    title: 'Advanced Configuration',
    description: 'Customize your setup with advanced options including webhooks, automations, and custom workflows.',
    gradient: 'from-rose-400 to-pink-500',
  },
]

const mockFeaturedResult = {
  title: 'View All Documentation',
  description: 'Browse our complete documentation library for tutorials, guides, and reference materials.',
}

const mockAiSummary = `Based on your search, I found relevant documentation about setup, integration, and configuration. The Getting Started guide is recommended for new users.`

type SearchState = 'idle' | 'typing' | 'thinking' | 'results'

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}: SearchBarProps) {
  const [searchState, setSearchState] = useState<SearchState>('idle')
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const thinkingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Determine if search bar should be expanded
  const isExpanded = isFocused || value.trim() !== ''

  // Handle input changes with typing detection
  const handleChange = (newValue: string) => {
    onChange(newValue)

    if (newValue.trim() === '') {
      setSearchState('idle')
      setIsOpen(false)
      return
    }

    setSearchState('typing')
    setIsOpen(true)

    // Clear existing timeouts
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    if (thinkingTimeoutRef.current) clearTimeout(thinkingTimeoutRef.current)

    // After user stops typing, simulate AI thinking
    typingTimeoutRef.current = setTimeout(() => {
      setSearchState('thinking')

      // Simulate AI processing time
      thinkingTimeoutRef.current = setTimeout(() => {
        setSearchState('results')
      }, 1500)
    }, 500)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
      if (thinkingTimeoutRef.current) clearTimeout(thinkingTimeoutRef.current)
    }
  }, [])

  const handleFocus = () => {
    setIsFocused(true)
    if (value.trim()) setIsOpen(true)
  }

  const handleBlur = () => {
    // Delay blur to allow clicking on dropdown items
    setTimeout(() => {
      if (!isOpen) setIsFocused(false)
    }, 200)
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        width: isExpanded ? '200px' : '100px',
        transition: 'width 0.2s ease-in-out'
      }}
    >
      <TextField.Root
        size="2"
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{ width: '100%' }}
      >
        <TextField.Slot>
          {searchState === 'thinking' ? (
            <div className="animate-spin h-4 w-4 border-2 border-[var(--color-primary)] border-t-transparent rounded-full" />
          ) : (
            <MagnifyingGlassIcon height="16" width="16" />
          )}
        </TextField.Slot>
        {searchState === 'typing' && (
          <TextField.Slot side="right">
            <span className="text-xs text-[var(--color-text-muted)]">typing...</span>
          </TextField.Slot>
        )}
      </TextField.Root>

      {/* Full-width Mega Menu Dropdown */}
      {isOpen && value.trim() && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20"
            style={{ zIndex: 9998, top: '64px' }}
            onClick={() => setIsOpen(false)}
          />

          {/* Mega Menu */}
          <div
            className="fixed left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl overflow-hidden"
            style={{
              zIndex: 9999,
              top: '80px',
              width: '900px',
              maxWidth: 'calc(100vw - 2rem)',
              border: '1px solid rgba(0,0,0,0.1)'
            }}
          >

            {/* Typing State */}
            {searchState === 'typing' && (
              <div style={{ padding: '48px 40px' }} className="text-center text-[var(--color-text-muted)]">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="w-3 h-3 bg-[var(--color-primary)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-3 h-3 bg-[var(--color-primary)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-3 h-3 bg-[var(--color-primary)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <p className="text-sm">Keep typing to search...</p>
              </div>
            )}

            {/* Thinking State */}
            {searchState === 'thinking' && (
              <div style={{ padding: '40px' }}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="animate-spin h-5 w-5 border-2 border-[var(--color-accent)] border-t-transparent rounded-full" />
                  <span className="text-sm font-medium text-[var(--color-text)]">AI is searching...</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-4">
                      <div className="h-20 bg-[var(--color-bg-secondary)] rounded-xl animate-pulse" />
                      <div className="h-5 bg-[var(--color-bg-secondary)] rounded animate-pulse w-3/4" />
                      <div className="h-4 bg-[var(--color-bg-secondary)] rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Results State */}
            {searchState === 'results' && (
              <div style={{ padding: '32px 40px 24px 40px' }}>
                <div className="flex flex-col lg:flex-row" style={{ gap: '48px' }}>
                  {/* Left: AI Results List */}
                  <div className="flex-1">
                    <h3 className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide" style={{ marginBottom: '24px' }}>
                      AI Results
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {mockAiResults.map((result) => (
                        <a
                          key={result.id}
                          href="#"
                          className="flex items-start rounded-xl hover:bg-[var(--color-bg-secondary)] transition-colors group"
                          style={{ gap: '20px', padding: '16px' }}
                        >
                          {/* Gradient Thumbnail */}
                          <div
                            className={`rounded-xl bg-gradient-to-br ${result.gradient} flex-shrink-0 shadow-lg`}
                            style={{ width: '64px', height: '64px' }}
                          />

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                              {result.title}
                            </h4>
                            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-2" style={{ marginTop: '8px' }}>
                              {result.description}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Right: AI Summary (Text Only) */}
                  <div style={{ width: '320px', flexShrink: 0 }}>
                    <h3 className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide" style={{ marginBottom: '24px' }}>
                      AI Summary
                    </h3>
                    <div className="bg-[var(--color-bg-secondary)] rounded-xl" style={{ padding: '24px' }}>
                      <h4 className="text-base font-semibold text-[var(--color-text)]" style={{ marginBottom: '12px' }}>
                        {mockFeaturedResult.title}
                      </h4>
                      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                        {mockAiSummary}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-center" style={{ marginTop: '32px', paddingTop: '20px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                  <span className="text-sm text-[var(--color-text-muted)]">
                    Want more detailed results?{' '}
                    <a href="#" className="text-[var(--color-accent)] hover:underline inline-flex items-center gap-1">
                      Talk to AI Assistant
                      <ChatBubbleIcon className="w-3.5 h-3.5" />
                    </a>
                  </span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
