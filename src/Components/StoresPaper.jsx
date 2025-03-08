import { ShoppingCartOutlined } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import React from 'react'

import { styled } from '@mui/material/styles';

const StackStyle = styled(Stack)(() => ({
    backgroundColor: "#FFEBE1",
}));
const StoresPaper = ({
    name,
    price
}) => {
    return (
        <Stack>
            <Typography variant='caption' textTransform={"capitalize"} color='text.secondary'>
                stores:
            </Typography>
            <Stack spacing={1} direction={"row"}>
                <StackStyle spacing={0.5} alignItems={"center"} p={1} borderRadius={"8px"}>
                    <Typography variant='body2' textAlign={"center"}>
                        {name}
                    </Typography>
                    <Typography variant='body1' fontWeight={"bold"} textAlign={"center"} color='primary.main'>
                        {price}
                    </Typography>
                    <Stack>
                        <Button
                            variant='contained'
                            size='small'
                            endIcon={<ShoppingCartOutlined />}
                            color='info'
                        >
                            Sell
                        </Button>
                    </Stack>
                </StackStyle>
                <StackStyle spacing={0.5} alignItems={"center"} p={1} borderRadius={"8px"}>
                    <Typography variant='body2' textAlign={"center"}>
                        {name}
                    </Typography>
                    <Typography variant='body1' fontWeight={"bold"} textAlign={"center"} color='primary.main'>
                        {price}
                    </Typography>
                    <Stack>
                        <Button
                            variant='contained'
                            size='small'
                            endIcon={<ShoppingCartOutlined />}
                            color='info'
                        >
                            Sell
                        </Button>
                    </Stack>
                </StackStyle>
            </Stack>
        </Stack>
    )
}

export default StoresPaper