import React, { memo } from 'react'
import classnames from 'classnames'

const Input = (props) => {
    const { label, name, onChange, className, value, ...rest } = props

    const labelClasses = classnames('label has-text-weight-medium', className)
    const inputClasses = classnames('input', className)

    return (
        <div className="field">
            {label && <label className={labelClasses}>{label}</label>}
            <div className='control'>
                <input
                    name={name}
                    onChange={onChange}
                    className={inputClasses}
                    value={value}
                    {...rest}
                />
            </div>
        </div>
    )
}

export default memo(Input)
