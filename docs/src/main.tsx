import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MagicCursor, MagicCursorProvider } from '../../lib';

import './index.css';

const rootNode = document.getElementById('root');

ReactDOM.createRoot(rootNode!).render(
  <StrictMode>
    <MagicCursorProvider thickness={2}>
      <MagicCursor />
      <App />
    </MagicCursorProvider>
  </StrictMode>
);
