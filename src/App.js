import { Spin } from 'antd';
import React, { Suspense } from 'react';

const Home = React.lazy(() => import('./components/Home'));

function App() {
  return (
    <Suspense
      fallback={
        <div className="loading">
          <Spin size="large" tip="loading..." className="loading__spin" />
        </div>
      }
    >
      <Home />
    </Suspense>
  );
}

export default App;
