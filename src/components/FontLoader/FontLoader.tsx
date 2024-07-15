import React from 'react';
import { Helmet } from 'react-helmet';

export const FontLoader: React.FC = () => (
  <Helmet>
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap"
      rel="stylesheet"
    />
  </Helmet>
);