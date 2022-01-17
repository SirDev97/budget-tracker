import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BudgetsProvider } from './contexts/BudgetContext';

ReactDOM.render(
  <BudgetsProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BudgetsProvider>,
  document.getElementById('root')
);
