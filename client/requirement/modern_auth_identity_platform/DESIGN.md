---
name: Modern Auth & Identity Platform
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353943'
  surface-container-lowest: '#0a0e17'
  surface-container-low: '#181b25'
  surface-container: '#1c1f29'
  surface-container-high: '#262a34'
  surface-container-highest: '#31353f'
  on-surface: '#dfe2ef'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#dfe2ef'
  inverse-on-surface: '#2c303a'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb3ad'
  on-tertiary: '#68000a'
  tertiary-container: '#ff5451'
  on-tertiary-container: '#5c0008'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ad'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#930013'
  background: '#0f131c'
  on-background: '#dfe2ef'
  surface-variant: '#31353f'
typography:
  display-hero:
    fontFamily: Inter
    fontSize: 44px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: -0.01em
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-pill:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies high-precision developer-grade craftsmanship combined with fintech-level trust. Built for critical infrastructure—authentication, permission engines, API access, and user identity—the aesthetic communicates zero-latency performance, ironclad security, and understated technical elegance.

The visual style synthesizes modern technical minimalism with subtle glassmorphic depth:
- **Atmosphere:** Deep, hyper-clean slate canvases accented by radiant indigo-violet energy conduits and precise emerald state indicators.
- **Precision Detailing:** Micro-radii, hairline inner borders (0.5px–1px), and soft ambient drop shadows that simulate layered, floating tactile cards.
- **Visual Rhythm:** Dense, utilitarian data structures counterbalanced by expansive, breathable dashboard cards and authentication flows.
- **Emotional Intent:** Authority, clarity, technical empowerment, and frictionless execution.

## Colors

The palette operates on an ultra-deep charcoal/slate foundation optimized for data density and optical comfort during continuous operational use.

### Roles & Semantic Mapping
- **Primary (`#6366F1` / `#4F46E5`):** The operational driver. Used for primary CTAs, active identity tokens, active navigation indicators, and focused input states.
- **Secondary / Accent (`#10B981`):** The verification signal. Reserved for active sessions, multi-factor authorization verified states, healthy API quotas, and cryptographic validation badges.
- **Tertiary / Destructive (`#EF4444`):** The containment marker. Applied strictly to revoked API keys, unauthorized access attempts, session termination, and destructive deletion warnings.
- **Neutral Foundation (`#090D16`):** The deep-space slate canvas. Graded surfaces evolve upward through translucent zinc tiers:
  - Base canvas: `#090D16`
  - Elevated surfaces / Containers: `#0F172A` with an overlay of `rgba(255, 255, 255, 0.03)`
  - Outlines & Borders: `rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.14)`
  - Text Hierarchy: Primary text (`#F8FAFC`), Secondary label text (`#94A3B8`), Muted helper text (`#64748B`).

## Typography

The typographic engine pairs **Inter** for high-clarity interface mechanics and conversion flows with **JetBrains Mono** for developer artifact representations (API credentials, OAuth scopes, JWT tokens, and telemetry metadata).

### Typographic Principles
- **Tracking & Proportion:** Headings utilize strict negative tracking (down to `-0.03em`) to deliver the confident, dense weight characteristic of leading developer-first tooling.
- **Code & Security Strings:** Any cryptographic key, session hash, timestamp, or raw identity string must be displayed in `label-code` or `label-mono` with tabular figures enabled (`font-variant-numeric: tabular-nums`).
- **Pills & Metatags:** Status badges use uppercase `label-pill` with `0.04em` positive letter spacing for optimal scan-readability against high-contrast backgrounds.

## Layout & Spacing

The layout is constructed on a 12-column responsive fluid grid pinned to an absolute maximum content width of `1440px` for high-density dashboards, and a centered `440px` single-column frame for standalone auth modules (Sign-in, SSO Redirects, MFA verification).

### Form Factor Behavior
- **Desktop (1024px+):** 12-column grid, `2rem` outer margin, `1.5rem` gutters. Collapsible side-navigation fixed at `260px`. Multi-pane user tables and permission matrices occupy variable column spans (e.g., 8-col user list, 4-col context inspector).
- **Tablet (768px – 1023px):** 8-column layout, `1.5rem` outer canvas padding. Detail panes transition into slide-over sheets.
- **Mobile (<768px):** Single-column fluid stack. Grid gutters collapse to `0.75rem`, margins to `1rem`. Tables reflow into structured card stacks displaying essential identity properties first.

## Elevation & Depth

Visual hierarchy uses a refined combination of dark glassmorphism, precise hairline strokes, and violet-ambient edge lighting.

### Elevation Levels
- **Canvas Base (Level 0):** Pure dark slate (`#090D16`), occasionally accented by fixed radial gradient blurs (`radial-gradient(ellipse at top, rgba(99, 102, 241, 0.12), transparent 70%)`).
- **Floating Panels & Cards (Level 1):** Translucent backdrop (`rgba(15, 23, 42, 0.75)` with `backdrop-filter: blur(16px)`). Bound by an interior hairline edge border (`1px solid rgba(255, 255, 255, 0.08)`).
- **Interactive Triggers & Dropdowns (Level 2):** Elevated dark slate surfaces (`rgba(30, 41, 59, 0.95)` with `blur(20px)`), enclosed with `1px solid rgba(255, 255, 255, 0.12)` and shadowed by `0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.05)`.
- **Modals & Command Palettes (Level 3):** Grounded by a backdrop scrim (`rgba(3, 7, 18, 0.7)` with `backdrop-filter: blur(8px)`). Modal containers feature an active top highlight (`box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.15)`) and a deep ambient spread (`0 25px 50px -12px rgba(0, 0, 0, 0.7)`).

## Shapes

The interface embraces a balanced shape geometry: structural cards use generous curvature, while inputs and interactive micro-elements maintain crisp control.

- **Primary Cards & Containers:** Styled with `rounded-xl` (1.5rem / 24px) to soften the information density and create clear visual grouping.
- **Form Inputs, Buttons & Table Cells:** Set to standard rounded (0.5rem / 8px) for crisp alignment along vertical scanning axes.
- **Status Chips, Badges & Verification Pills:** Executed as full pills (`border-radius: 9999px`) to immediately distinguish contextual status from structural actionable containers.

## Components

### Buttons
- **Primary:** Background gradient from `#6366F1` to `#4F46E5`. Subtle top inset highlight (`box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.2)`), subtle drop shadow (`0 4px 14px 0 rgba(99, 102, 241, 0.35)`). Active state applies `scale(0.98)`.
- **Secondary (Ghost Glass):** Transparent surface with `rgba(255, 255, 255, 0.04)`, `1px solid rgba(255, 255, 255, 0.08)` border. Hover introduces `rgba(255, 255, 255, 0.08)` fill and `rgba(255, 255, 255, 0.2)` border.
- **Destructive:** Background `rgba(239, 68, 68, 0.1)`, text `#EF4444`, border `rgba(239, 68, 68, 0.2)`. Hover shifts to solid `#EF4444` fill with white text.

### Form Inputs & Identity Fields
- **Container:** Height of 40px, background `rgba(15, 23, 42, 0.6)`, border `1px solid rgba(255, 255, 255, 0.1)`. Radius is 8px.
- **Focused State:** Border shifts cleanly to `#6366F1` accompanied by a localized focus ring (`box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2)`).
- **Masked Auth Inputs (OTP / MFA):** Segmented square input blocks (48px x 48px), centered mono-spaced glyphs, blinking indigo caret.

### Status Chips & Badges
- **Active / MFA Verified:** Full-pill structure. Fill `rgba(16, 185, 129, 0.12)`, border `1px solid rgba(16, 185, 129, 0.25)`, text `#10B981`. Includes a 6px glowing emerald pulse dot.
- **Revoked / Suspended:** Fill `rgba(239, 68, 68, 0.12)`, border `1px solid rgba(239, 68, 68, 0.25)`, text `#EF4444`.
- **Role Badges (Admin, Read, Service):** Fill `rgba(99, 102, 241, 0.1)`, border `1px solid rgba(99, 102, 241, 0.2)`, text `#818CF8`.

### Identity Cards & Tables
- **Cards:** Defined by `rounded-xl` (24px) corners, glassmorphic backdrop blur, and stacked vertical information slots with hairline dividers (`rgba(255, 255, 255, 0.06)`).
- **Data Tables (User Management):** Striped hover states (`rgba(255, 255, 255, 0.02)`), sticky header with uppercase micro-typography (`11px`, tracking `0.05em`), and inline quick-action menus that reveal on row hover.

### Specialized Auth Components
- **API Secret Key Box:** Single-line display with copy button, secret value partially masked with asterisks, accompanied by a quick-revoke contextual dropdown.
- **Audit Log Telemetry Stream:** Monospaced real-time event logs with status-coded timestamps, IP address geolocation pills, and JSON payload inspect toggles.