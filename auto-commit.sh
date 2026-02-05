#!/bin/bash

# Auto-commit script for ECHO Portal UI refinements
# Run from the project root directory

cd /Users/ommac36/Documents/ECHO

# Add all changes
git add .

# Commit with descriptive message
git commit -m "refactor(ui): Navbar and LeftSidebar component refinements

- Navbar: Adjusted bottom border opacity to 10%, added equal left/right padding (24px)
- LeftSidebar: Redesigned with clean icon-based menu, 2-level nested dropdowns
- LeftSidebar: Added hover state, active page highlighting (subtle style)
- LeftSidebar: Visual differentiation for parent vs child chevrons
- Menu data: Updated to Vehicles (V1, V2, VX2, DIRT.E K3) and Digital Products (CApp, Website, HMI)
- SearchBar/NavLinks dropdowns: Added subtle border (rgba(0,0,0,0.1))
- EditBar: Changed action buttons to tertiary (ghost) style, kept Done as primary
- AIPanel: Switched to light mode, removed progress updates and review changes sections"

echo "✅ Changes committed successfully!"
