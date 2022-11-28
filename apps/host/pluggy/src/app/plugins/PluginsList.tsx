import {useGetPluginsQuery} from "./services/plugin";

import * as React from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import {DynamicComponent} from "../components/dynamic/DynamicComponent";
import {environment} from "../../environments/environment";


export const PluginsList = () => {
    const { data: plugins, error, isLoading } = useGetPluginsQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>error</div>;
    }
  return (
    <React.Suspense fallback={null}>
            <header style={{display:'inline-block'}}>
            <div>
                {plugins?.map((plugin,index) => (
                    <li key={index}>
                        <Link to={plugin}>{plugin}</Link>
                    </li>
                ))}
            </div>
            </header>
            <Routes>
               {plugins?.map((plugin,index) => (
                    <Route path={plugin} element={<DynamicComponent url={`${environment.pluggyLocatorUrl}/plugins/${plugin}/remoteEntry.js`}  scope="plugme" module="./Module"/>} />
                ))}
            </Routes>

    </React.Suspense>
  );
}
