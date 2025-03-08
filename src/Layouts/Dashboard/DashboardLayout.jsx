import Box from '@mui/material/Box';
import Header from './Header';
import Main from './Main';
import NavDrawer from './NavDrawer';
import { Stack } from '@mui/material';
import { DashboardProvider } from '../../Context/Dashboard';
import PropTypes from 'prop-types';

export const drawerWidth = 248;

const DashboardLayout = ({ children }) => {
    return (
        <DashboardProvider>
            <Box sx={{ display: 'flex', minHeight: '100dvh', overflow: 'hidden' }}>
                <NavDrawer />
                <Main>
                    <Header />
                    <Stack py={3}>
                        {children}
                    </Stack>
                </Main>
            </Box>
        </DashboardProvider>
    )
}

export default DashboardLayout

DashboardLayout.propTypes = {
    children: PropTypes.node.isRequired,
};