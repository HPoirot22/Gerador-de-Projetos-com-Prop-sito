
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-purple-600">
        Gerador de Projetos com Propósito
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        Descubra a intersecção entre suas paixões e habilidades para criar um projeto significativo.
      </p>
    </header>
  );
};

export default Header;
