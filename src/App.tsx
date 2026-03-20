import { ThemeProvider } from "@/hooks";
import { HomePage } from "@/components/pages/HomePage";

export default function App() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
}
