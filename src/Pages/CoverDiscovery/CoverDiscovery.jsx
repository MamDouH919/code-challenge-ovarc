import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { DashboardContext } from '../../Context/DashboardContext';
import BooksList from './BooksList';
import { styled } from '@mui/material/styles';
import AuthorsList from './AuthorsLIst';

const TabListStyle = styled(TabList)(() => ({
    "& .MuiTabs-list": {
        justifyContent: "center",
    },
}));

export default function CoverDiscovery() {
    const { dispatch } = React.useContext(DashboardContext);
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    React.useEffect(() => {
        dispatch({ type: "SET_PAGE_NAME", payload: "Cover Discovery" })
        return () => {
            dispatch({ type: "SET_PAGE_NAME", payload: "" })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabListStyle onChange={handleChange} aria-label="lab API tabs example" >
                        <Tab label="Books" value="1" />
                        <Tab label="Stores" value="2" />
                    </TabListStyle>
                </Box>
                <TabPanel value="1">
                    <BooksList />
                </TabPanel>
                <TabPanel value="2">
                    <AuthorsList />
                </TabPanel>
            </TabContext>
        </Box>
    );
}