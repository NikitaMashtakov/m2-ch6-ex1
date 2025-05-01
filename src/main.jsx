import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AllTodoPage from 'pages/AllTodosPage/AllTodosPage';
import { TodoPage } from 'pages/TodoPage/TodoPage';
import { Route, Routes } from 'react-router';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
import { NotFoundPage } from 'pages/NotFoundPage/NotFoundPage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<AllTodoPage />} />
          <Route path="todos/:id" element={<TodoPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
