import React from 'react'

export default function Button({
    width,
    height,
    bgColor,
    textColor = 'black',
    textSize = 'sm',
    isBorder,
    borderColor = 'black',
    roundedValue,
    fontWeight,
    mxValue,
    buttonTitle = 'save'
}) {
    return (
        <div>
            <button className={`cursor-pointer w-${width} h-${height} bg-${bgColor} text-${textColor} text-${textSize} 
            ${isBorder ? 'border' : ''} border-${borderColor} rounded-${roundedValue} font-${fontWeight} mx-${mxValue}`}>
                {buttonTitle}
            </button>
        </div>
    )
}
