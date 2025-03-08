import { Paper, Stack, Typography } from "@mui/material"
import PropTypes from 'prop-types';
import { styled } from "@mui/material/styles";

const PaperStyle = styled(Paper)(({ fixedminheight, nodata }) => ({
    width: '100%',
    display: "grid",
    height: "100%",
    gridTemplateRows: nodata ? "auto" : "1fr auto",
    overflow: "hidden",
    ...(fixedminheight && { minHeight: fixedminheight })
}));

const ListPaper = ({
    children,
    loading,
    data,
    minHeight
}) => {

    return (
        <PaperStyle fixedminheight={minHeight} nodata={!loading && !data}>
            {loading ? children :
                data ? children :
                    <Stack justifyContent={"center"} alignItems={"center"} spacing={2} height={"100%"}>
                        <Typography textTransform={"capitalize"} py={5}>no data</Typography>
                    </Stack>
            }
        </PaperStyle>
    )
}

export default ListPaper

ListPaper.propTypes = {
    children: PropTypes.node.isRequired,
    loading: PropTypes.bool,
    data: PropTypes.bool,
    filters: PropTypes.bool,
    height: PropTypes.string,
    minHeight: PropTypes.string,
};