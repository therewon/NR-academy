import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter';
import { ScrollToTop } from './components/common/ScrollToTop';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
