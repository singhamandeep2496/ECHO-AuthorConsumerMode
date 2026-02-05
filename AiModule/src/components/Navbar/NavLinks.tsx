import { useState } from 'react'
import { ChevronDownIcon } from '@radix-ui/react-icons'

interface DropdownItem {
  label: string
  description: string
  href: string
  gradient: string
}

interface NavItem {
  label: string
  hasDropdown: boolean
  href?: string
  dropdownItems?: DropdownItem[]
}

const navItems: NavItem[] = [
  {
    label: 'Brands',
    hasDropdown: true,
    dropdownItems: [
      {
        label: 'Vida',
        description: 'Electric mobility solutions for sustainable urban transportation.',
        href: '/brands/vida',
        gradient: 'from-orange-400 to-rose-500'
      },
      {
        label: 'Dirt.E',
        description: 'Off-road electric vehicles built for adventure and exploration.',
        href: '/brands/dirt-e',
        gradient: 'from-amber-400 to-orange-500'
      },
      {
        label: 'Future Brands',
        description: 'Innovative concepts shaping the future of mobility.',
        href: '/brands/future-brands',
        gradient: 'from-violet-400 to-purple-500'
      },
    ]
  },
  {
    label: 'Products',
    hasDropdown: true,
    dropdownItems: [
      {
        label: 'Vehicles',
        description: 'Browse our complete range of electric vehicles and motorcycles.',
        href: '/products/vehicles',
        gradient: 'from-cyan-400 to-blue-500'
      },
      {
        label: 'Digital Products',
        description: 'Connected apps, services and digital experiences.',
        href: '/products/digital',
        gradient: 'from-emerald-400 to-teal-500'
      },
      {
        label: 'Space Design',
        description: 'Innovative retail and experience center concepts.',
        href: '/products/space-design',
        gradient: 'from-rose-400 to-pink-500'
      },
    ]
  },
  { label: 'Experiences', hasDropdown: false, href: '/experiences' },
]

export function NavLinks() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
      {navItems.map((item) => (
        item.hasDropdown ? (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => setOpenDropdown(item.label)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              className="flex items-center gap-1 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors cursor-pointer bg-transparent border-none"
              style={{ padding: '8px 0' }}
            >
              {item.label}
              <ChevronDownIcon
                className="h-4 w-4 transition-transform"
                style={{ transform: openDropdown === item.label ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>

            {/* Mega Menu Dropdown */}
            {openDropdown === item.label && (
              <div
                className="absolute left-1/2 bg-white rounded-2xl shadow-2xl overflow-hidden"
                style={{
                  transform: 'translateX(-50%)',
                  top: '100%',
                  marginTop: '8px',
                  width: '400px',
                  zIndex: 9999,
                  border: '1px solid rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {item.dropdownItems?.map((dropdownItem) => (
                      <a
                        key={dropdownItem.label}
                        href={dropdownItem.href}
                        className="flex items-start rounded-xl hover:bg-[var(--color-bg-secondary)] transition-colors group"
                        style={{ gap: '16px', padding: '12px' }}
                      >
                        {/* Gradient Thumbnail */}
                        <div
                          className={`rounded-xl bg-gradient-to-br ${dropdownItem.gradient} flex-shrink-0 shadow-md`}
                          style={{ width: '48px', height: '48px' }}
                        />

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                            {dropdownItem.label}
                          </h4>
                          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed" style={{ marginTop: '4px' }}>
                            {dropdownItem.description}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <a
            key={item.label}
            href={item.href}
            className="text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors"
          >
            {item.label}
          </a>
        )
      ))}
    </div>
  )
}
