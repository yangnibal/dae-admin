import React from 'react'
import Select from 'react-select'

const DropDown = ({option, className, isClearable, isSearchable, onChange, classNamePrefix, placeholder}) => {
    return (
        <Select
            onChange={onChange}
            options={option}
            className={className}
            classNamePrefix={classNamePrefix}
            isClearable={isClearable}
            isSearchable={isSearchable}
            placeholder={placeholder}
            styles={{
                placeholder: base => ({
                    ...base,
                    fontSize: '1rem',
                    color: 'white'
                })
            }}
        />
    )
}

export default DropDown