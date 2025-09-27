import ReactDOM from 'react-dom/client'

import LazyLoadingErrorBoundary from '~components/common/LazyLoadingErrorBoundary'

import Router from '~router/Router'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LazyLoadingErrorBoundary>
    <Router />
  </LazyLoadingErrorBoundary>,
)
