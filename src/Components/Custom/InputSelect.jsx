import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const InputSelect = ({
    handleChange,
    value,
    options,
    label
}) => {
    return (
        <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                size='small'
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={label}
                onChange={handleChange}
            >
                {options.map((option, index) => (
                    <MenuItem value={option.value} key={index}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default InputSelect