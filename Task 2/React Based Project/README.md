# React Calculator — Advanced (CSS Modules)

## Project Structure
```
src/
├── components/
│   ├── Header.jsx            + Header.module.css
│   ├── Display.jsx           + Display.module.css
│   ├── Button.jsx            + Button.module.css
│   ├── ButtonGrid.jsx        + ButtonGrid.module.css
│   ├── History.jsx           + History.module.css
│   └── useCalculator.js      (Custom Hook — all logic)
├── App.jsx                   + App.module.css
├── variables.css             (CSS variables for dark/light theme)
└── main.jsx
```

## React Concepts Used
- **Components**: 5 reusable components
- **Props**: Every component receives data via props
- **State**: useState for current, expression, theme, history
- **Custom Hook**: useCalculator.js isolates all calculator logic
- **useEffect**: keyboard listener, display font resize, localStorage sync
- **useCallback**: optimized press handler
- **CSS Modules**: Each component has its own .module.css — no style conflicts

## Features
- +, −, ×, ÷, %, +/- operations
- Calculation history (last 50, saved in localStorage)
- Dark / Light theme
- Full keyboard support
- Divide by zero error handling
- Responsive display font size

## Setup
```bash
npm install
npm run dev
```