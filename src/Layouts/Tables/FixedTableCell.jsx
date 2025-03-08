import { memo } from "react";
import { styled } from '@mui/material/styles';
import { TableCell } from "@mui/material";
// import { useTranslation } from "react-i18next";
import PropTypes from 'prop-types';

const PREFIX = 'FixedTableCell';

const classes = {
    cellWidth: `${PREFIX}-cellWidth`
};

const StyledTableCell = styled(TableCell)(() => ({
    [`& .${classes.cellWidth}`]: {
        whiteSpace: "normal",
        maxWidth: "200px",
        inlineSize: "max-content",
    }
}));


export const FixedTableCell = memo(function FixedTableCell(props) {
    const { allowPlaceholder = true, dir, ...restProps } = props;

    return (
        <StyledTableCell {...restProps}>
            <div className={classes.cellWidth} dir={dir}>
                {props.children ?? (allowPlaceholder && "ــــ")}
            </div>
        </StyledTableCell>
    );
});

FixedTableCell.propTypes = {
    children: PropTypes.node,
    allowPlaceholder: PropTypes.bool,
    dir: PropTypes.string,
};