
import React, { memo } from 'react'
import { ICON_TYPE } from "./index"

const Index: React.FC<Partial<ICON_TYPE>> = props => {
    const { width = 24, height = 24, onClick,color="#FFF" ,className = "" } = props
    return (
        <svg
            onClick={onClick}
            width={width}
            height={height}
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={className}
        >
            <g clipPath='url(#clip0_2446_4488)'>
                <rect x='5.25' y='17.999' width='18' height='1.5' transform='rotate(-45 5.25 17.999)' fill={color} />
                <rect x='6' y='5.25' width='18' height='1.5' transform='rotate(45 6 5.25)' fill={color} />
            </g>
            <defs>
                <clipPath id='clip0_2446_4488'>
                    <rect width={width} height={height} fill={color} />
                </clipPath>
            </defs>
        </svg>
    )
}

export default memo(Index)
