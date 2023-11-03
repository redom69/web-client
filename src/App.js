import { BrowserRouter } from 'react-router-dom';

import { WebRouter } from './router';
import { AdminRouter } from './router';

function App() {
  return (
    <BrowserRouter>
      <WebRouter />
      <AdminRouter />
    </BrowserRouter>
  );
}

export default App;
