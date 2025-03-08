import { Search } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import React from 'react'

const InputText = ({
    label,
    value,
    handleChange,
    type,
    InputProps
}) => {

    return (
        <TextField
            label={label}
            id="outlined-size-small"
            size="small"
            type={type ?? 'text'}
            value={value}
            onChange={handleChange}
            InputProps={InputProps}
        />

    )
}

export default InputText