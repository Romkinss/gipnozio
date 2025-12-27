
import React from 'react';

const Warning: React.FC = () => {
  return (
    <div className="bg-red-50 py-8 border-t border-red-100">
      <div className="container mx-auto px-4 flex justify-center items-center gap-4 text-center">
        <p className="text-red-800 font-medium text-sm md:text-base">
          Предупреждение: Если вы не начнете действовать сейчас, через год вы будете жалеть, что не начали сегодня. Рынок растет, успейте занять свое место.
        </p>
      </div>
    </div>
  );
};

export default Warning;
