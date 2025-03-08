import { Stack, Typography } from '@mui/material'

const NotFound = () => {
    return (
        <Stack justifyContent={"center"} alignItems={"center"} height={"100%"}>
            <Typography variant="h1">404</Typography>
            <Typography variant="body1">Page not found</Typography>
        </Stack>
    )
}

export default NotFound