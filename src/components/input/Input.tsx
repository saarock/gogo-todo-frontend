import React, { forwardRef } from 'react'
import { InputProps } from '../../types'
import useTheme from '../../context/modeContext.ts'

const Input: React.FC<InputProps> = forwardRef(
    (
        {
            className = `gogo__primary__input`,
            type = 'text',
            placeholder = 'text...',
            ...props
        },
        ref: React.ForwardedRef<HTMLInputElement>
    ) => {
        const theme = useTheme()
        return (
            <input
                type={type}
                placeholder={placeholder}
                className={`${className} ${theme.themeMode == 'dark' ? 'gogo__dark__input' : ''} focus:invalid:ring-pink-500`}
                {...props}
                ref={ref}
            />
        )
    }
)

export default Input
