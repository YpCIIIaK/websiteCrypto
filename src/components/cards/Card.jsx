import React from 'react';

const Card = ({ title, children }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{title}</h2>
            <div className="w-full">{children}</div>
        </div>
    );
};

export default Card;