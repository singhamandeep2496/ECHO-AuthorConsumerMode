import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@radix-ui/themes'
import { HamburgerMenuIcon, Cross1Icon, PersonIcon, ExitIcon, DashboardIcon, BellIcon } from '@radix-ui/react-icons'
import { GitBranch, ChevronDown } from 'lucide-react'
import { NavLinks } from './NavLinks'
import { SearchBar } from './SearchBar'
import { MobileMenu } from './MobileMenu'
import echoLogo from '../../assets/echo-logo.png'

const BRANCHES = ['Main', 'dev', 'staging', 'feature/new-ui']
const APP_VERSION = 'v1.0.0'

interface User {
  id: string
  name: string
  avatar?: string
}

interface NavbarProps {
  user?: User | null
  onLogin?: () => void
  onLogout?: () => void
}

export function Navbar({ user, onLogin, onLogout }: NavbarProps) {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [branchMenuOpen, setBranchMenuOpen] = useState(false)
  const [activeBranch, setActiveBranch] = useState('Main')
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
        {/* Left: Logo + Version / Branch */}
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center">
            <img src={echoLogo} alt="ECHO" className="h-8" />
          </a>

          {isLoggedIn ? (
            /* Branch selector (logged in) */
            <div
              style={{ position: 'relative' }}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setBranchMenuOpen(false)
                }
              }}
            >
              <button
                onClick={() => setBranchMenuOpen(!branchMenuOpen)}
                className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-100"
                style={{
                  padding: '4px 10px',
                  borderRadius: 6,
                  border: '1px solid #e5e7eb',
                  backgroundColor: 'transparent',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: '#374151',
                  transition: 'background-color 0.15s ease',
                }}
                tabIndex={0}
              >
                <GitBranch size={14} style={{ color: '#6b7280' }} />
                {activeBranch}
                <ChevronDown size={12} style={{ color: '#9ca3af' }} />
              </button>

              {branchMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '6px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 10px 38px -10px rgba(22,23,24,0.35), 0 10px 20px -15px rgba(22,23,24,0.2)',
                    minWidth: '180px',
                    zIndex: 9999,
                    border: '1px solid rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    padding: '4px 0',
                  }}
                >
                  <div style={{ padding: '6px 12px', borderBottom: '1px solid #e5e7eb' }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Switch branch</p>
                  </div>
                  {BRANCHES.map(branch => (
                    <button
                      key={branch}
                      onClick={() => { setActiveBranch(branch); setBranchMenuOpen(false) }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '7px 12px',
                        fontSize: '0.825rem',
                        color: activeBranch === branch ? '#1f2937' : '#374151',
                        fontWeight: activeBranch === branch ? 600 : 400,
                        backgroundColor: activeBranch === branch ? '#f3f4f6' : 'transparent',
                        width: '100%',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                      className="hover:bg-gray-100"
                    >
                      <GitBranch size={13} style={{ color: activeBranch === branch ? '#1f2937' : '#9ca3af' }} />
                      {branch}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Version label (logged out) */
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 500,
                color: '#9ca3af',
                letterSpacing: '0.02em',
              }}
            >
              {APP_VERSION}
            </span>
          )}
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

          {isLoggedIn ? (
            <div
              style={{ position: 'relative' }}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setUserMenuOpen(false);
                }
              }}
            >
              <div
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center justify-center cursor-pointer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-accent)',
                  color: 'white',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
                tabIndex={0}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                ) : (
                  getInitials(user.name)
                )}
              </div>

              {/* Red dot notification indicator */}
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#ef4444',
                  borderRadius: '50%',
                  border: '2px solid white',
                  pointerEvents: 'none'
                }}
              />

              {/* Custom Dropdown Menu */}
              {userMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '8px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 10px 38px -10px rgba(22,23,24,0.35), 0 10px 20px -15px rgba(22,23,24,0.2)',
                    minWidth: '200px',
                    zIndex: 9999,
                    border: '1px solid rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid #e5e7eb' }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1f2937' }}>{user.name}</p>
                  </div>

                  <a
                    href="/profile"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                      padding: '8px 12px',
                      fontSize: '0.875rem',
                      color: '#374151',
                      textDecoration: 'none',
                      cursor: 'pointer'
                    }}
                    className="hover:bg-gray-100"
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <BellIcon />
                      Notifications
                    </span>
                    <span
                      style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        padding: '2px 6px',
                        borderRadius: '10px',
                        minWidth: '18px',
                        textAlign: 'center'
                      }}
                    >
                      2
                    </span>
                  </a>

                  <a
                    href="/"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      fontSize: '0.875rem',
                      color: '#374151',
                      textDecoration: 'none'
                    }}
                    className="hover:bg-gray-100"
                  >
                    <DashboardIcon />
                    Branch Dashboard
                  </a>

                  <div style={{ height: '1px', backgroundColor: '#e5e7eb', margin: '4px 0' }} />

                  <button
                    onClick={() => { setUserMenuOpen(false); onLogout?.(); navigate('/public'); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      fontSize: '0.875rem',
                      color: '#ef4444',
                      width: '100%',
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                    className="hover:bg-gray-100"
                  >
                    <ExitIcon />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
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
        {/* Left: Logo + Version / Branch */}
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center">
            <img src={echoLogo} alt="ECHO" className="h-8" />
          </a>
          {isLoggedIn ? (
            <div
              style={{ position: 'relative' }}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setBranchMenuOpen(false)
                }
              }}
            >
              <button
                onClick={() => setBranchMenuOpen(!branchMenuOpen)}
                className="flex items-center gap-1 cursor-pointer hover:bg-gray-100"
                style={{
                  padding: '3px 8px',
                  borderRadius: 6,
                  border: '1px solid #e5e7eb',
                  backgroundColor: 'transparent',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: '#374151',
                  transition: 'background-color 0.15s ease',
                }}
                tabIndex={0}
              >
                <GitBranch size={12} style={{ color: '#6b7280' }} />
                {activeBranch}
                <ChevronDown size={10} style={{ color: '#9ca3af' }} />
              </button>

              {branchMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '6px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 10px 38px -10px rgba(22,23,24,0.35), 0 10px 20px -15px rgba(22,23,24,0.2)',
                    minWidth: '160px',
                    zIndex: 9999,
                    border: '1px solid rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    padding: '4px 0',
                  }}
                >
                  <div style={{ padding: '6px 12px', borderBottom: '1px solid #e5e7eb' }}>
                    <p style={{ fontSize: '0.65rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Switch branch</p>
                  </div>
                  {BRANCHES.map(branch => (
                    <button
                      key={branch}
                      onClick={() => { setActiveBranch(branch); setBranchMenuOpen(false) }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '7px 12px',
                        fontSize: '0.8rem',
                        color: activeBranch === branch ? '#1f2937' : '#374151',
                        fontWeight: activeBranch === branch ? 600 : 400,
                        backgroundColor: activeBranch === branch ? '#f3f4f6' : 'transparent',
                        width: '100%',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                      className="hover:bg-gray-100"
                    >
                      <GitBranch size={12} style={{ color: activeBranch === branch ? '#1f2937' : '#9ca3af' }} />
                      {branch}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 500,
                color: '#9ca3af',
              }}
            >
              {APP_VERSION}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* User avatar on mobile */}
          {isLoggedIn && (
            <div
              style={{ position: 'relative' }}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setUserMenuOpen(false);
                }
              }}
            >
              <div
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center justify-center cursor-pointer"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-accent)',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
                tabIndex={0}
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={user?.name} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                ) : (
                  getInitials(user?.name || '')
                )}
              </div>

              {/* Red dot notification indicator */}
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#ef4444',
                  borderRadius: '50%',
                  border: '2px solid white',
                  pointerEvents: 'none'
                }}
              />

              {/* Custom Dropdown Menu */}
              {userMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '8px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 10px 38px -10px rgba(22,23,24,0.35), 0 10px 20px -15px rgba(22,23,24,0.2)',
                    minWidth: '180px',
                    zIndex: 9999,
                    border: '1px solid rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid #e5e7eb' }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1f2937' }}>{user?.name}</p>
                  </div>

                  <a
                    href="/profile"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                      padding: '8px 12px',
                      fontSize: '0.875rem',
                      color: '#374151',
                      textDecoration: 'none'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <BellIcon />
                      Notifications
                    </span>
                    <span
                      style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        padding: '2px 6px',
                        borderRadius: '10px',
                        minWidth: '18px',
                        textAlign: 'center'
                      }}
                    >
                      2
                    </span>
                  </a>

                  <a
                    href="/"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      fontSize: '0.875rem',
                      color: '#374151',
                      textDecoration: 'none'
                    }}
                  >
                    <DashboardIcon />
                    Branch Dashboard
                  </a>

                  <div style={{ height: '1px', backgroundColor: '#e5e7eb', margin: '4px 0' }} />

                  <button
                    onClick={() => { setUserMenuOpen(false); onLogout?.(); navigate('/public'); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      fontSize: '0.875rem',
                      color: '#ef4444',
                      width: '100%',
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <ExitIcon />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
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
          isLoggedIn={isLoggedIn}
        />
      )}
    </header>
  )
}
