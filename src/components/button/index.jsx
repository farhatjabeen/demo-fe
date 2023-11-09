import React from 'react'

export default function Button({ props }) {
    return (
        <div>
            <button className={`w-${props.width} h-${props.height} bg-${props.bgColor} text-${props.textColor} text-${props.textSize} 
            ${props.isBorder ? 'border' : ''} border-${props.borderColor} rounded-${props.roundedValue} font-${props.fontWeight} mx-${props.mxValue}`}>
                {props.buttonTitle}
            </button>
        </div>
    )
}
