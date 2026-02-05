import { Button } from '@radix-ui/themes'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { SearchBar } from './SearchBar'

interface MobileMenuProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  onLogin?: () => void
  onContribute?: () => void
  isLoggedIn?: boolean
}

export function MobileMenu({
  searchQuery,
  onSearchChange,
  onLogin,
  onContribute,
  isLoggedIn
}: MobileMenuProps) {
  return (
    <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="flex flex-col gap-4 px-4 py-6">
        {/* Mobile Search */}
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          className="w-full"
        />

        {/* Mobile Navigation Links */}
        <nav className="flex flex-col gap-1">
          <MobileNavItem label="Brands" hasDropdown />
          <MobileNavItem label="Products" hasDropdown />
          <MobileNavItem label="Blog" />
        </nav>

        {/* Mobile Action Buttons */}
        <div className="flex flex-col gap-3 pt-4 border-t border-[var(--color-border)]">
          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={onContribute}
          >
            Contribute
          </Button>
          {!isLoggedIn && (
            <Button
              className="w-full cursor-pointer"
              onClick={onLogin}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

function MobileNavItem({ label, hasDropdown }: { label: string; hasDropdown?: boolean }) {
  return (
    <button className="flex items-center justify-between w-full px-3 py-3 text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)] rounded-md transition-colors">
      {label}
      {hasDropdown && <ChevronDownIcon className="h-5 w-5" />}
    </button>
  )
}
