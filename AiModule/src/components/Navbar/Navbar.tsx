import { useState } from 'react'
import { Button, DropdownMenu } from '@radix-ui/themes'
import { HamburgerMenuIcon, Cross1Icon, PersonIcon, ExitIcon, DashboardIcon } from '@radix-ui/react-icons'
import { NavLinks } from './NavLinks'
import { SearchBar } from './SearchBar'
import { MobileMenu } from './MobileMenu'
import echoLogo from '../../assets/echo-logo.png'

interface User {
  id: string
  name: string
  avatar?: string
}

interface NavbarProps {
  user?: User | null
  onLogin?: () => void
  onLogout?: () => void
  onContribute?: () => void
}

export function Navbar({ user, onLogin, onLogout, onContribute }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const isLoggedIn = !!user

  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--color-bg)]" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
      {/* Desktop: 3-column grid layout */}
      <div
        className="hidden md:grid"
        style={{
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          height: '64px',
          paddingLeft: '24px',
          paddingRight: '24px'
        }}
      >
        {/* Left: Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img src={echoLogo} alt="ECHO" className="h-8" />
          </a>
        </div>

        {/* Center: Navigation (truly centered) */}
        <nav className="flex items-center justify-center">
          <NavLinks />
        </nav>

        {/* Right: Search, Contribute, Login/Profile */}
        <div className="flex items-center justify-end gap-3">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search..."
          />
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={onContribute}
          >
            Contribute
          </Button>

          {isLoggedIn ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <button
                  className="flex items-center justify-center cursor-pointer"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-accent)',
                    color: 'white',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: 'none',
                  }}
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                  ) : (
                    getInitials(user.name)
                  )}
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content sideOffset={8} align="end">
                <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--color-border)' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text)' }}>{user.name}</p>
                </div>
                <DropdownMenu.Item asChild>
                  <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <DashboardIcon />
                    Branch Dashboard
                  </a>
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item onClick={onLogout} color="red" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ExitIcon />
                  Sign Out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          ) : (
            <Button
              className="cursor-pointer"
              onClick={onLogin}
            >
              Login
            </Button>
          )}
        </div>
      </div>

      {/* Mobile: flex layout */}
      <div className="md:hidden flex h-16 items-center justify-between" style={{ paddingLeft: '24px', paddingRight: '16px' }}>
        {/* Left: Logo */}
        <a href="/" className="flex items-center">
          <img src={echoLogo} alt="ECHO" className="h-8" />
        </a>

        <div className="flex items-center gap-2">
          {/* User avatar on mobile */}
          {isLoggedIn && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <button
                  className="flex items-center justify-center cursor-pointer"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-accent)',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    border: 'none',
                  }}
                >
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user?.name} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                  ) : (
                    getInitials(user?.name || '')
                  )}
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content sideOffset={8} align="end">
                <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--color-border)' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text)' }}>{user?.name}</p>
                </div>
                <DropdownMenu.Item asChild>
                  <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <DashboardIcon />
                    Branch Dashboard
                  </a>
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item onClick={onLogout} color="red" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ExitIcon />
                  Sign Out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}

          {/* Mobile menu button */}
          <button
            className="p-2 rounded-md text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <Cross1Icon className="h-6 w-6" />
            ) : (
              <HamburgerMenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <MobileMenu
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onLogin={onLogin}
          onContribute={onContribute}
          isLoggedIn={isLoggedIn}
        />
      )}
    </header>
  )
}
