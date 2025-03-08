import { Stack, Typography } from '@mui/material'

const NodataFound = () => {
    return (
        <Stack justifyContent={"center"} alignItems={"center"} height={"100%"}>
            <Typography variant="body1">No data found</Typography>
        </Stack>
    )
}

export default NodataFound