import { useThemeStore } from './store/themeStore';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  const { darkMode } = useThemeStore();

  return (
      <div className="bg-red-500 text-white min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">Tailwind funciona ✅</h1>
      </div>
    )
}

export default App
