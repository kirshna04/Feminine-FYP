import React from 'react'

const Button = ({text,className,onPressFunc,style}) => { 
  return (
    <div>
      <button className={className} onClick={onPressFunc} style={style}>{text}</button>
    </div>
  )
}

export default Button
