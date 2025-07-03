import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Button = ({
  variant = "solid",
  size = "md",
  children,
  className = "",
  as: Component = "button",
  to,
  ...props
}) => {
  const sizeStyles = {
    lg: "px-6 min-w-24 h-12 text-base",
    md: "px-4 h-10 text-sm",
    sm: "px-3 h-8 text-xs",
  };

  const baseStyles = `
    relative inline-flex items-center justify-center box-border appearance-none select-none
    whitespace-nowrap subpixel-antialiased overflow-hidden
    transition-all duration-200 ease-in-out
    font-medium rounded-lg
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500
    active:scale-95
    ${sizeStyles[size]}
    ${className}
  `;

  const variantStyles = {
    solid: 'bg-gradient-to-r from-green-600 to-teal-500 text-white border-transparent hover:opacity-90',
    default: 'bg-gradient-to-r from-green-600 to-teal-500 text-white border-transparent hover:opacity-90',
    outline: 'border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
  };

  const componentProps = Component === Link ? { to, ...props } : props;

  return (
    <motion.button
      as={Component}
      className={`${baseStyles} ${variantStyles[variant]}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...componentProps}
    >
      {children}
    </motion.button>
  );
};

export default Button;