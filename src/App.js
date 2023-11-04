import { BrowserRouter } from 'react-router-dom';

import { WebRouter } from './router';
import { AdminRouter } from './router';
import { AuthProvider } from './contexts';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <WebRouter />
        <AdminRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
