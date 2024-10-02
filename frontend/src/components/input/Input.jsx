import React from 'react'

const Input = ({type,placeholder,name,className,onChangeFunc,defaultValue,style,onKeyDown}) => {
  return (
    <div>
        <input 
            type={type} 
            placeholder={placeholder} 
            name={name} 
            defaultValue={defaultValue}
            className={className}
            onChange={(e)=>onChangeFunc(e)}
            onKeyDown={onKeyDown && ((e) => onKeyDown(e))}
            style={style}
        />
    </div>
  )
}

export default Input