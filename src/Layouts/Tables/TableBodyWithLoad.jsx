import { Skeleton, TableBody, TableRow } from "@mui/material";
import { FixedTableCell } from "./FixedTableCell";
import PropTypes from 'prop-types';

const TableBodyWithLoad = (props) => {
  const { loading, tableCellHeaderLength, children, loadingLength } = props;

  const loadingArray = Array.from({ length: loadingLength ?? 11 }, (_, index) => index + 1);
  const FixedTableCellArray = Array.from({ length: tableCellHeaderLength }, (_, index) => index + 1);

  if (!loading) {
    return <>{children}</>;
  }

  return (
    <TableBody>
      {loadingArray.map((row) => (
        <TableRow hover tabIndex={-1} key={row}>
          {FixedTableCellArray.map((e) => (
            <FixedTableCell key={`${row}-${e}`}>
              <Skeleton animation="wave" width={50} height={50} />
            </FixedTableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableBodyWithLoad;


TableBodyWithLoad.propTypes = {
  loading: PropTypes.bool,
  tableCellHeaderLength: PropTypes.number,
  children: PropTypes.node,
  loadingLength: PropTypes.number,
};
