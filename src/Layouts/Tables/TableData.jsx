import { Table, TableBody, TableContainer } from '@mui/material';
import TableBodyWithLoad from './TableBodyWithLoad';
import PropTypes from 'prop-types';

const TableData = ({
    headCells,
    loading,
    tableBody,
    tableHead,
    toolBar
}) => {
    return (
        <>
            {toolBar && toolBar}
            <TableContainer sx={{ width: "100%", overflow: "auto" }}>
                <Table stickyHeader aria-label="sticky table">
                    {tableHead}
                    <TableBodyWithLoad loading={loading} tableCellHeaderLength={headCells}>
                        <TableBody>
                            {tableBody}
                        </TableBody>
                    </TableBodyWithLoad>
                </Table>
            </TableContainer>
        </>
    )
}

export default TableData

TableData.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    tableCellHeader: PropTypes.array,
    tableBody: PropTypes.node,
};