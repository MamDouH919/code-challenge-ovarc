import { Grid2 as Grid, Paper, Stack, Typography } from '@mui/material';

import { useEffect, useState } from 'react';
import { RiRefund2Fill } from 'react-icons/ri';


const Details = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('/refundOrders.json')
            .then(response => response.json())
            .then(data => setOrders(data))
            .catch(error => console.error('Error fetching refund orders:', error));
    }, []);

    return (
        <Stack>
            <Grid container width={"100%"} m={0}>
                <Grid size={{ xs: 12 }}>
                    <Paper sx={{ p: 4, width: "100%" }}>
                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                            <Stack spacing={2}>
                                <Typography variant={"h5"} textTransform={"capitalize"}>
                                    Refund Orders
                                </Typography>
                                <Typography variant={"body2"} fontSize={18}>
                                    {orders.length}
                                </Typography>
                            </Stack>
                            <Stack
                                justifyContent={"center"}
                                alignItems={"center"}
                                sx={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: (theme) => theme.palette.primary.main }}>
                                <RiRefund2Fill fontSize={30} color='white' />
                            </Stack>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Stack>
    )
}

export default Details