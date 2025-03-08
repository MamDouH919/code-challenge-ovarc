import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { drawerWidth } from "./DashboardLayout";
import { Link, useLocation } from "react-router";
import { DashboardContext } from "../../Context/DashboardContext";
import { RiRefund2Fill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import clsx from "clsx";
import logo from '../../Assets/logo.png';

// Styled Components
const PREFIX = "NavDrawer";

const classes = {
    root: `${PREFIX}-root`,
    drawer: `${PREFIX}-drawer`,
    drawerPaper: `${PREFIX}-drawerPaper`,
    listItemFocus: `${PREFIX}-listItemFocus`,
    navLink: `${PREFIX}-navLink`,
    nestedListItem: `${PREFIX}-nestedListItem`,
    navSubItem: `${PREFIX}-navSubItem`,
    listItemText: `${PREFIX}-listItemText`,
    listItemButton: `${PREFIX}-listItemButton`,
};

const Root = styled(Drawer)(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
    },
    [`& .${classes.drawerPaper}`]: {
        width: drawerWidth,
        backgroundColor: theme.palette.background.paper,
    },

    [`& .${classes.navLink}`]: {
        display: "flex",
        textDecoration: "none",
        color: theme.palette.text.primary,
        justifyContent: "center",
        alignItems: "center",
        width: 172,
        opacity: 0.5,
        "&:hover": {
            borderLeft: "3px solid " + theme.palette.primary.main,
            opacity: 1,
            color: theme.palette.primary.main,
            "& svg": {
                color: theme.palette.primary.main,
            },
        },
        borderLeft: "3px solid transparent",
    },
    [`& .${classes.listItemFocus}`]: {
        color: theme.palette.primary.main,
        "& svg": {
            color: theme.palette.primary.main,
        },
        borderLeft: "3px solid " + theme.palette.primary.main,
        opacity: 1,
    },
    [`& .${classes.nestedListItem}`]: {
        padding: theme.spacing(0.5, 1),
        paddingLeft: theme.spacing(1.5),
    },
    [`& .${classes.navSubItem}`]: {
        padding: theme.spacing(0, 2),
        minWidth: "20px !important",
        "& svg": {
            fontSize: "22px",
        },
    },
    [`& .${classes.listItemButton}`]: {
        padding: theme.spacing(0, 2),
    },
    [`& .${classes.listItemText}`]: {
        fontSize: "16px",
        textTransform: "capitalize",
    },
}));

const NavDrawer = () => {
    const linksList = [
        {
            pathname: "/",
            icon: MdDashboard,
            primary: "shop",
            id: "shop"
        },
        {
            pathname: "/stores",
            icon: RiRefund2Fill,
            primary: "Stores",
            id: "stores"
        },
        {
            pathname: "/author",
            icon: RiRefund2Fill,
            primary: "Author",
            id: "author"
        },
        {
            pathname: "/books",
            icon: RiRefund2Fill,
            primary: "Books",
            id: "books"
        },
        {
            pathname: "stores/cover-discovery",
            icon: RiRefund2Fill,
            primary: "Cover Discovery",
            id: "cover-discovery"
        },
    ];

    const { pathname } = useLocation();

    return (
        <Root
            variant={"persistent"}
            anchor="left"
            open={true}
        >
            <Stack p={4}>
                <img src={logo} alt="logo" />
            </Stack>
            <List component={Stack} spacing={2}>
                {linksList.map((link, index) => {
                    return (
                        <Link
                            key={index}
                            to={link.pathname}
                            className={clsx(classes.navLink, {
                                [classes.listItemFocus]: pathname === "/" ? link.id === "shop" : pathname.includes(link.id)
                            })}
                        >
                            <ListItemButton className={classes.listItemButton}>
                                <ListItemIcon className={classes.navSubItem}>
                                    {link.icon && <link.icon />}
                                </ListItemIcon>
                                <ListItemText className={classes.listItemText} primary={link.primary} />
                            </ListItemButton>
                        </Link>
                    );
                })}
            </List>
        </Root>
    );
};

export default NavDrawer;
