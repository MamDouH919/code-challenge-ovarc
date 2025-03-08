import { styled } from "@mui/material/styles";
import { FixedTableCell } from './FixedTableCell';
import PropTypes from 'prop-types';
import { Link } from "react-router";

const Root = styled("div")(({ theme }) => ({
    "a": {
        textDecoration: "none",
        color: theme.palette.primary.main,
        opacity: 1,
        [`&:hover`]: {
            textDecoration: "underline",
        },
    }
}));


const CellLink = ({ to, children }) => {
    return (
        <FixedTableCell>
            <Root>
                {children ? <Link to={to}>
                    {children}
                </Link> : "ــــ"}
            </Root>
        </FixedTableCell>
    )
}

export default CellLink

CellLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};