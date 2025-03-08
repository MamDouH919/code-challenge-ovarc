import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router'

const ButtonLink = ({
    name,
    to
}) => {
    return (
        <Link to={to}>
            <Button variant={"contained"} size='small'>
                {name}
            </Button>
        </Link>
    )
}

export default ButtonLink