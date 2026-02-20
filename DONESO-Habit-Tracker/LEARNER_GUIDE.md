# 🎓 DONEZO Learner's Guide

Welcome to the **DONEZO** project! This guide is designed for junior developers to understand the project structure, technology stack, and core engineering concepts used in this application.

---

## 📂 1. Project Structure Overiew

An organized codebase is the foundation of a scalable app. Here is how **DONEZO** is structured:

```text
DONEZO/
├── public/                 # Static assets (favicons, manifest.json)
├── src/
│   ├── components/         # Reusable UI building blocks
│   │   ├── ui/             # Core Shadcn UI base components (Buttons, Inputs, etc.)
│   │   ├── Sidebar.tsx     # Site-wide navigation (Desktop & Mobile versions)
│   │   └── HabitCard.tsx   # The main display unit for individual habits
│   ├── hooks/              # Custom React hooks (The "Brain" of the App)
│   │   └── useHabits.ts    # Manages data, persistence, and logic
│   ├── pages/              # Main view components (The different "Screens")
│   │   ├── Index.tsx       # "Home" - Daily habit tracking list
│   │   ├── Dashboard.tsx   # High-level metrics and AI insights
│   │   └── Statistics.tsx  # Visual charts and historical trends
│   ├── lib/                # Utility functions (e.g., cn for class merging)
│   ├── App.tsx             # Main router and provider configuration
│   └── main.tsx            # Entry point of the React application
├── tailwind.config.ts      # Design system tokens (colors, animations)
└── package.json            # Project dependencies and script aliases
```

---

## 🛠️ 2. Technology Stack

- **Vite & React**: The engine. Vite provides lightning-fast builds, while React handles the UI components.
- **TypeScript**: Adds "types" to our code. Instead of guessing what a variable is, TypeScript ensures we know exactly (e.g., `Habit` object instead of just `any`).
- **Tailwind CSS**: Utility-first styling. We write CSS directly in classes, which makes styling fast and consistent.
- **Shadcn UI**: A collection of high-quality components built on top of Radix UI and Tailwind.
- **Lucide React**: Our icon system.

---

## 💾 3. Deep Dive: `localStorage`

Since DONEZO doesn't use a backend database (yet!), we use **Local Storage** to save your habits.

### What is `localStorage`?
It is a small, built-in storage area in your web browser. Imagine it as a simple "Key-Value" notepad that stays saved even after you refresh the page or close the browser.

### How we use it in `useHabits.ts`:
1. **Reading**: When you first open the app, we check if there's any data saved under the key `"habit-tracker-data"`.
   ```typescript
   const saved = localStorage.getItem("habit-tracker-data");
   if (saved) setHabits(JSON.parse(saved)); // Turn the string back into a JavaScript object
   ```
2. **Writing**: Every time you add or complete a habit, we update the notepad.
   ```typescript
   // Every time the 'habits' state changes, save it!
   useEffect(() => {
     localStorage.setItem("habit-tracker-data", JSON.stringify(habits));
   }, [habits]);
   ```

**⚠️ Important limitation**: `localStorage` only stores **Strings**. That is why we use `JSON.stringify()` when saving and `JSON.parse()` when reading.

---

## 🧠 4. State Management (`useHabits`)

The `useHabits` hook is a **Custom Hook**. It centralizes all habit-related logic so that components like `Index.tsx` or `Dashboard.tsx` don't have to worry about *how* a habit is saved—they just call `addHabit()` or `deleteHabit()`.

### Key Logic:
- **State**: The `habits` array is the "Source of Truth" for the entire app.
- **Persistence**: Side effects (`useEffect`) sync this state with the browser's `localStorage`.
- **Calculations**: The hook also calculates **Streaks** automatically whenever a completion is toggled.

---

## 🎨 5. Styling & Mobile Responsiveness

We use a **Mobile-First** approach. Most of our components use responsive prefixes like `sm:`, `md:`, and `lg:`.

- **`p-4 sm:p-8`**: Padding starts at 1rem (4) on mobile and grows to 2rem (8) on larger screens.
- **The Sidebar**: It’s hidden on mobile and replaced by a **Bottom Navigation Bar** and a **Hamburger Menu**. This mimics native mobile app behavior.

---

## 🚀 6. Tips for Contributing

1. **Keep components small**: If a component gets over 100 lines, consider breaking it into smaller pieces in `src/components`.
2. **Use the `cn` utility**: When combining fixed classes with dynamic ones (like colors), use `cn("base-class", dynamicClass)`.
3. **Think about types**: Always define an interface if you're passing data around.
4. **Wow the user**: Use the design system tokens in `tailwind.config.ts` to keep the app looking premium.

---

Happy coding, and let's keep track of those habits! 🧘‍♂️💻🏃‍♀️
