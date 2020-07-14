import React, { memo } from 'react'

const Dropdown = (props) => {
    const {
        label,
        className,
        name,
        placeholder,
        objectValue,
        defaultValue,
        value,
        ...rest
    } = props

    return (
        <div className='field'>
            {label && <label className='label'>{label}</label>}
            <div className='control'>
                <div className='select is-fullwidth'>
                    <select name={name} value={value ? value : ''} {...rest}>
                        {placeholder && (
                            <option value='' disabled defaultValue>
                                {placeholder}
                            </option>
                        )}

                        {objectValue.map((item, index) => {
                            return (
                                <option key={index} value={item.value}>
                                    {item.text}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default memo(Dropdown)
