import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Link from '@mui/material/Link';

import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {
    Link as RouterLink,
    Route,
    Routes,
    MemoryRouter,
    useLocation,
} from 'react-router';

const breadcrumbNameMap = {
    '/books': 'Books',
    '/stores': 'Stores',
    '/author': 'Authors',
    '/shop': 'Shop',
    '/shop/books': 'Books',
    '/stores/cover-discovery': 'Cover Discovery',

};

function ListItemLink(props) {
    const { to, open, ...other } = props;
    const primary = breadcrumbNameMap[to];

    let icon = null;
    if (open != null) {
        icon = open ? <ExpandLess /> : <ExpandMore />;
    }

    return (
        <li>
            <ListItemButton component={RouterLink} to={to} {...other}>
                <ListItemText primary={primary} />
                {icon}
            </ListItemButton>
        </li>
    );
}

ListItemLink.propTypes = {
    open: PropTypes.bool,
    to: PropTypes.string.isRequired,
};

function LinkRouter(props) {
    return <Link {...props} component={RouterLink} />;
}

function BreadcrumbsComponent() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <Breadcrumbs aria-label="breadcrumb">
            <LinkRouter underline="hover" color="inherit" to="/">
                Home
            </LinkRouter>
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                return last ? (
                    <Typography key={to} sx={{ color: 'text.primary' }}>
                        {breadcrumbNameMap[to]}
                    </Typography>
                ) : (
                    <LinkRouter underline="hover" color="inherit" to={to} key={to}>
                        {breadcrumbNameMap[to]}
                    </LinkRouter>
                );
            })}
        </Breadcrumbs>
    );
}

export default BreadcrumbsComponent;