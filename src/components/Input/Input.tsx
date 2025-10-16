import React, { forwardRef } from 'react'
import { cn } from '../../utils'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  helperText?: string
  variant?: 'default' | 'filled' | 'outlined'
  size?: 'sm' | 'md' | 'lg'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, variant = 'default', size = 'md', id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    
    const baseClasses = 'hiiot-input-base'
    
    const variantClasses = {
      default: 'border-gray-300 focus:border-primary-500',
      filled: 'bg-gray-50 border-gray-300 focus:bg-white focus:border-primary-500',
      outlined: 'border-2 border-gray-300 focus:border-primary-500'
    }
    
    const sizeClasses = {
      sm: 'h-8 px-2 text-sm',
      md: 'h-10 px-3',
      lg: 'h-12 px-4 text-lg'
    }

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            baseClasses,
            variantClasses[variant],
            sizeClasses[size],
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          {...props}
        />
        {(error || helperText) && (
          <p className={cn(
            'mt-1 text-sm',
            error ? 'text-red-600' : 'text-gray-500'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input