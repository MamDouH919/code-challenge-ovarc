
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import { drawerWidth } from './DashboardLayout';

const MainPage = styled('main')(() => ({
    flexGrow: 1,
    width: "calc(100vw - " + drawerWidth + "px)",
    height: "100dvh",
    overflow: "hidden",

}));


const Main = ({ children }) => {
    return (
        <MainPage>
            <Stack height={"100dvh"} px={2} width={"100%"}>
                <Stack flexGrow={1} overflow={"auto"}>
                    {children}
                </Stack>
            </Stack>
        </MainPage>
    )
}

export default Main