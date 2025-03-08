import { Box, Stack, Toolbar, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import profilePic from '../../Assets/profile-pic.png';
import { DashboardContext } from '../../Context/DashboardContext';
import { useContext } from 'react';
import RouterBreadcrumbs from './BreadCrumb';

const AppBar = styled(MuiAppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.default,
    zIndex: 1201,
    borderBottom: '1px solid ' + theme.palette.divider,
    padding: theme.spacing(2, 0),
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    padding: `${theme.spacing(0, 0.5)} !important`,
}));

const ImageStyle = styled("img")(() => ({
    objectFit: "cover",
    width: "100%",
    height: "100%",
}));


const Header = () => {
    const { state } = useContext(DashboardContext);
    return (
        <AppBar position='relative'>
            <ToolbarStyle>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} width={"100%"}>
                    <Stack>
                        <Typography color='text.primary'>
                            {state.pageName}
                        </Typography>
                        <Typography color='text.secondary'>
                            <RouterBreadcrumbs />
                        </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                        <Box width={40} height={40} borderRadius={"10px"} overflow={"hidden"}>
                            <ImageStyle src={profilePic} alt="profile-pic" />
                        </Box>
                        <Typography color='text.primary'>
                            Jacob Jones
                        </Typography>
                    </Stack>
                </Stack>
            </ToolbarStyle>
        </AppBar >
    )
}

export default Header