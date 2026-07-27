import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {AppProvider} from "@/shared/providers/AppProvider.tsx";
import {ThemeProvider} from "@/shared/providers/ThemeProvider.tsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ThemeProvider defaultTheme={"dark"} storageKey={"vite-ui-theme"}>
      <AppProvider>
            <App />
      </AppProvider>
      </ThemeProvider>
  </StrictMode>,
)
