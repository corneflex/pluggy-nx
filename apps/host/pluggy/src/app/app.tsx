import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';
import {useFederatedComponent} from "@pluggy/core";

export const DynamicComponent = ({url,scope,module}: { url:string, scope: string, module:string }) => {
  const {Component: DynComponent} = useFederatedComponent(url, scope, module);
  return DynComponent && <DynComponent/>;
};

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

        <Route path="/plugins-plugme" element={ DynamicComponent && <DynamicComponent url="http://localhost:4201/remoteEntry.js" scope="plugme" module="./Module" />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
