import { TextField } from '@mui/material'
import React from 'react'

const InputText = ({
    label,
    value,
    handleChange,
    type
}) => {

    return (
        <TextField
            label={label}
            id="outlined-size-small"
            size="small"
            type={type ?? 'text'}
            value={value}
            onChange={handleChange}
        />

    )
}

export default InputText