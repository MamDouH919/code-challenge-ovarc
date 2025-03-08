import { TablePagination } from "@mui/material";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

const MUITablePagination = (props) => {
    const {
        count,
        page,
        onPageChange,
    } = props;

    const PREFIX = "ListPickups";

    const classes = {
        background: `${PREFIX}-background`,
    };

    const Root = styled("div")(({ theme }) => ({
        [`& .${classes.background}`]: {
            "& .MuiTablePagination-toolbar": {
                padding: theme.spacing(0, 2),
                overflowY: "hidden",
                height: "100% !important",
                minHeight: "100% !important",
                "&::-webkit-scrollbar": {
                    height: "8px",
                }
            },
        },
    }));

    return (
        <Root>
            <TablePagination
                className={classes.background}
                sx={{
                    height: "40px",
                    "& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
                    {
                        margin: 0,
                    },
                }}
                labelRowsPerPage={""}
                rowsPerPageOptions={[]}
                component="div"
                count={count ? count : 20}
                rowsPerPage={10}
                page={!count || count <= 0 ? 0 : page}
                onPageChange={onPageChange}
                onRowsPerPageChange={() => { }}
                ActionsComponent={undefined}
                showFirstButton showLastButton
            />
        </Root>
    );
};

MUITablePagination.propTypes = {
    count: PropTypes.number,
    page: PropTypes.number,
    onPageChange: PropTypes.func,
};

export default MUITablePagination;
