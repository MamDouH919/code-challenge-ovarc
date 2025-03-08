import { Stack } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';

const LoadingPage = () => {
    return (
        <Stack justifyContent={"center"} alignItems={"center"} height={"100%"}>
            <CircularProgress disableShrink />;
        </Stack>
    )
}

export default LoadingPage