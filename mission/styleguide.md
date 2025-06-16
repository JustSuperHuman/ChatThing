# Style Guide: Just Gains Theme

This style guide outlines the visual design, color palette, typography, and component library for the "Chat Thang" application, based on the "Just Gains" theme.

---

## 🎨 Color Palette & Theming

The application uses a CSS variable-based theming system for light and dark modes, defined in `src/styles/globals.css`.

### Core Colors (CSS Variables)

| Variable        | Light Mode HSL | Dark Mode HSL |
| :-------------- | :------------- | :------------ |
| `--background`  | `0 0% 96%`     | `222 24% 8%`  |
| `--foreground`  | `222 84% 4.9%` | `210 40% 98%` |
| `--card`        | `0 0% 100%`    | `222 20% 12%` |
| `--primary`     | `49 100% 50%`  | `49 85% 50%`  |
| `--secondary`   | `210 40% 96%`  | `217 16% 20%` |
| `--destructive` | `0 84% 60%`    | `0 84% 60%`   |
| `--border`      | `210 3% 88%`   | `217 16% 25%` |
| `--ring`        | `49 100% 50%`  | `49 85% 50%`  |

---

## 🖋️ Typography

- **Primary Font:** `Montserrat`
- **Font Stack:** `'Montserrat', system-ui, Avenir, Arial, Helvetica, sans-serif`
- **Base Styles:** Font smoothing and other base rendering properties are defined in the `:root` selector in `src/styles/globals.css`.

---

## 🧱 Component Library: shadcn/ui

The application will be built using the **shadcn/ui** component library. All components are located in `src/components/ui`.

### Core Principles

- **Composition:** Build complex UI elements by composing simpler `shadcn` components.
- **Theming:** All component colors are driven by the CSS variables defined in `globals.css`.
- **Accessibility:** Adhere to the accessibility standards provided by `radix-ui`, which powers `shadcn` components.

### Commonly Used Components

- **Button:** For all clickable actions. Use the `variant` and `size` props for different styles.
- **Card:** For all panel-like containers.
- **Input:** For all text input fields.
- **DropdownMenu:** For menus and model selectors.
- **Sheet:** For the mobile navigation sidebar.
- **Dialog:** For modal windows.
- **Avatar:** For user profile pictures.
- **Badge:** For tags and status indicators.

---

## 📐 Layout & Spacing

- **Base Unit:** The layout is based on a `4px` grid system. Spacing values should be multiples of `4` (e.g., `p-4` for `16px`, `gap-2` for `8px`).
- **Border Radius:** A global border radius of `0.5rem` (`--radius`) is used for most components.
- **Responsiveness:** The layout must be fully responsive, with a mobile-first approach. Use Tailwind's responsive prefixes (e.g., `md:`, `lg:`) to adapt the layout for different screen sizes.
