import { useState } from 'react'
import { notificationsData } from '../../data/mockNotifications'
import { useNavigate } from 'react-router-dom'
import { Button } from '@radix-ui/themes'
import { HamburgerMenuIcon, Cross1Icon, ExitIcon, DashboardIcon, BellIcon, GearIcon } from '@radix-ui/react-icons'
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
  showNotificationDot?: boolean
}

export function Navbar({ user, onLogin, onLogout, showNotificationDot = true }: NavbarProps) {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false)
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
                    marginTop: '8px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 10px 38px -10px rgba(22,23,24,0.35), 0 10px 20px -15px rgba(22,23,24,0.2)',
                    minWidth: '220px',
                    zIndex: 9999,
                    border: '1px solid rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>Switch branch</p>
                  </div>
                  <div style={{ padding: '4px 0' }}>
                    {BRANCHES.map(branch => (
                      <button
                        key={branch}
                        onClick={() => { setActiveBranch(branch); setBranchMenuOpen(false) }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px 16px',
                          fontSize: '0.875rem',
                          color: activeBranch === branch ? '#1f2937' : '#374151',
                          fontWeight: activeBranch === branch ? 600 : 400,
                          backgroundColor: activeBranch === branch ? '#f3f4f6' : 'transparent',
                          width: '100%',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'background-color 0.15s ease'
                        }}
                        className="hover:bg-gray-50"
                      >
                        <GitBranch size={14} style={{ color: activeBranch === branch ? '#1f2937' : '#9ca3af' }} />
                        {branch}
                      </button>
                    ))}
                  </div>
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
            <>
              {/* Notification Bell */}
              <div
                style={{ position: 'relative' }}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setNotificationMenuOpen(false);
                  }
                }}
              >
                <div
                  onClick={() => setNotificationMenuOpen(!notificationMenuOpen)}
                  className="flex items-center justify-center cursor-pointer hover:bg-gray-100"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    color: '#374151',
                    position: 'relative'
                  }}
                  tabIndex={0}
                >
                  <BellIcon width={18} height={18} />
                  {/* Red dot notification indicator */}
                  {showNotificationDot && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#ef4444',
                        borderRadius: '50%',
                        border: '1.5px solid white',
                        pointerEvents: 'none'
                      }}
                    />
                  )}
                </div>

                {/* Notifications Dropdown */}
                {notificationMenuOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: -60,
                      marginTop: '8px',
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 10px 38px -10px rgba(22,23,24,0.35), 0 10px 20px -15px rgba(22,23,24,0.2)',
                      width: '320px',
                      zIndex: 9999,
                      border: '1px solid rgba(0,0,0,0.1)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
                      <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>Notifications</p>
                    </div>

                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      {notificationsData.slice(0, 5).map(notification => (
                        <div
                          key={notification.id}
                          style={{
                            padding: '12px 16px',
                            borderBottom: '1px solid #f3f4f6',
                            cursor: 'pointer',
                            backgroundColor: notification.read ? 'white' : '#f0f9ff'
                          }}
                          className="hover:bg-gray-50 transition-colors"
                          onClick={() => navigate('/profile')}
                        >
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <div style={{ flex: 1 }}>
                              <p style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '2px' }}>
                                {notification.repo} <span style={{ color: '#9ca3af' }}>{notification.issueNumber}</span>
                              </p>
                              <p style={{ fontSize: '0.825rem', fontWeight: notification.read ? 400 : 500, color: '#1f2937', marginBottom: '4px', lineHeight: 1.4 }}>
                                {notification.title}
                              </p>
                              <p style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{notification.time}</p>
                            </div>
                            {!notification.read && (
                              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3b82f6', marginTop: '6px', flexShrink: 0 }} />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ padding: '8px', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
                      <button
                        onClick={() => {
                          setNotificationMenuOpen(false);
                          navigate('/profile');
                        }}
                        style={{
                          width: '100%',
                          padding: '8px',
                          fontSize: '0.825rem',
                          fontWeight: 500,
                          color: '#4b5563',
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                        className="hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      >
                        Show all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Avatar Dropdown (existing) */}
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
                      minWidth: '220px',
                      zIndex: 9999,
                      border: '1px solid rgba(0,0,0,0.1)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
                      <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{user.name}</p>
                    </div>


                    <a
                      href="/settings"
                      style={{
                        display: 'block',
                        padding: '8px 16px',
                        fontSize: '0.875rem',
                        color: '#374151',
                        textDecoration: 'none',
                        transition: 'background-color 0.15s'
                      }}
                      className="hover:bg-gray-100"
                    >
                      Account Settings
                    </a>

                    <a
                      href="/profile?tab=dashboard"
                      style={{
                        display: 'block',
                        padding: '8px 16px',
                        fontSize: '0.875rem',
                        color: '#374151',
                        textDecoration: 'none',
                        transition: 'background-color 0.15s'
                      }}
                      className="hover:bg-gray-100"
                    >
                      Dashboard
                    </a>

                    <div style={{ height: '1px', backgroundColor: '#e5e7eb', margin: '4px 0' }} />

                    <button
                      onClick={() => { setUserMenuOpen(false); onLogout?.(); navigate('/public'); }}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '8px 16px',
                        fontSize: '0.875rem',
                        color: '#ef4444',
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background-color 0.15s'
                      }}
                      className="hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
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

              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: '8px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 10px 38px -10px rgba(22,23,24,0.35), 0 10px 20px -15px rgba(22,23,24,0.2)',
                  minWidth: '220px',
                  zIndex: 9999,
                  border: '1px solid rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>Switch branch</p>
                </div>
                <div style={{ padding: '4px 0' }}>
                  {BRANCHES.map(branch => (
                    <button
                      key={branch}
                      onClick={() => { setActiveBranch(branch); setBranchMenuOpen(false) }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 16px',
                        fontSize: '0.875rem',
                        color: activeBranch === branch ? '#1f2937' : '#374151',
                        fontWeight: activeBranch === branch ? 600 : 400,
                        backgroundColor: activeBranch === branch ? '#f3f4f6' : 'transparent',
                        width: '100%',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background-color 0.15s ease'
                      }}
                      className="hover:bg-gray-50"
                    >
                      <GitBranch size={14} style={{ color: activeBranch === branch ? '#1f2937' : '#9ca3af' }} />
                      {branch}
                    </button>
                  ))}
                </div>
              </div>
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
                    minWidth: '220px',
                    zIndex: 9999,
                    border: '1px solid rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>{user?.name}</p>
                  </div>


                  <a
                    href="/settings"
                    style={{
                      display: 'block',
                      padding: '8px 16px',
                      fontSize: '0.875rem',
                      color: '#374151',
                      textDecoration: 'none'
                    }}
                  >
                    Account Settings
                  </a>

                  <a
                    href="/profile?tab=dashboard"
                    style={{
                      display: 'block',
                      padding: '8px 16px',
                      fontSize: '0.875rem',
                      color: '#374151',
                      textDecoration: 'none'
                    }}
                  >
                    Dashboard
                  </a>

                  <div style={{ height: '1px', backgroundColor: '#e5e7eb', margin: '4px 0' }} />

                  <button
                    onClick={() => { setUserMenuOpen(false); onLogout?.(); navigate('/public'); }}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '8px 16px',
                      fontSize: '0.875rem',
                      color: '#ef4444',
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
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
