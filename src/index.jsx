import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { HeroUIProvider } from "@heroui/react";
import './styles/style.css';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <HeroUIProvider>
      <App />,
    </HeroUIProvider>
  </BrowserRouter>
);
