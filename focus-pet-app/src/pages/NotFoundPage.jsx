import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Nie znaleziono strony</h1>
      <p>Strona, której szukasz, nie istnieje.</p>
      <Link to="/login">Wróć na stronę główną</Link>
    </div>
  );
};

export default NotFoundPage;
