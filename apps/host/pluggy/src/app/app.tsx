import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';

const PluginsPlugme = React.lazy(() => import('plugins-plugme/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/plugins-plugme">PluginsPlugme</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="host-pluggy" />} />

        <Route path="/plugins-plugme" element={<PluginsPlugme />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
