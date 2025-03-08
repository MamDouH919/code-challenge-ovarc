import TableRow from '@mui/material/TableRow';
import { FixedTableCell } from '../../Layouts/Tables/FixedTableCell';
import MUITablePagination from '../../Layouts/Tables/TablePagination';
import ListPaper from '../../Layouts/Tables/ListPaper';
import { toast } from 'sonner';
import { useEffect, useMemo, useState } from 'react';
import TableData from '../../Layouts/Tables/TableData';
import { Checkbox, IconButton, InputBase, Paper, Stack, TableCell, TableHead, TableSortLabel, Typography } from '@mui/material';
import { DeleteOutlined, EditOutlined, Search } from '@mui/icons-material';
import IconActionStyle from '../../Components/IconActionStyle';
import AddToInventory from './AddToInventory';

const headCells = [
    { id: 'id', name: "Book ID", },
    { id: 'name', name: "Name", },
    { id: 'page_count', name: "Page Count" },
    { id: 'author', name: "Author Name" },
    { id: 'price', name: "Price", },
    { id: 'actions', name: "Actions", },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, numSelected, rowCount, onRequestSort } =
        props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => {
                    if (headCell.id === "id") {
                        return <TableCell
                            key={headCell.id}
                            align={'left'}
                            padding={'normal'}
                            sortDirection={order}
                        >
                            <TableSortLabel
                                active={true}
                                direction={order}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.name}
                            </TableSortLabel>
                        </TableCell>
                    } else {
                        return <TableCell
                            key={headCell.id}
                            align={'left'}
                            padding={'normal'}
                        >
                            {headCell.name}
                        </TableCell>
                    }
                })}
            </TableRow>
        </TableHead>
    );
}

export default function BooksList() {
    const [order, setOrder] = useState('asc');
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rowData, setRowData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [page, setPage] = useState(0);
    const rowsPerPage = 10;

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = data.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, page) => {
        setPage(page);
    };

    useEffect(() => {
        setLoading(true);

        fetch('/authors.json')
            .then(response => response.json())
            .then(authorsData => {
                const authors = authorsData.map(author => ({ id: author.id, name: author.first_name + " " + author.last_name }));
                fetch('/books.json')
                    .then(response => response.json())
                    .then(fullData => {
                        const data = fullData.map(book => {
                            const author = authors.find(author => author.id === book.author_id);
                            return {
                                id: book.id,
                                name: book.name,
                                page_count: book.page_count,
                                author: author.name,
                                price: Math.floor(Math.random() * 100) + 1
                            }
                        })
                        setData(data)
                        setLoading(false)
                    })
                    .catch(() => {
                        toast.error('Error fetching books');
                        setLoading(false);
                    });
            })
            .catch(() => {
                toast.error('Error fetching authors');
            });
    }, []);

    const handleRequestSort = (event, property) => {
        const isAsc = order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');

        // Sort the data
        setData((prevData) =>
            [...prevData].sort((a, b) => {
                if (a[property] < b[property]) return isAsc ? -1 : 1;
                if (a[property] > b[property]) return isAsc ? 1 : -1;
                return 0;
            })
        );
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };


    const sortedData = useMemo(() => {
        return [...data].sort((a, b) => {
            if (a.id < b.id) return order === 'asc' ? -1 : 1;
            if (a.id > b.id) return order === 'asc' ? 1 : -1;
            return 0;
        });
    }, [data, order]);

    // Filter data based on searchQuery after sorting
    const filteredData = sortedData.filter((row) =>
        row.name.toLowerCase().includes(searchQuery)
        || row.page_count.toString().includes(searchQuery)
    );

    const handleViewDetails = (id) => {
        setRowData(data.find(book => book.id === id));
    };

    const handleDelete = (id) => {
        setData(prev => {
            const newData = [...prev];
            return newData.filter(book => book.id !== id);
        });
        toast.success('Book deleted successfully');
    };

    return (
        <Stack spacing={2}>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <Typography textTransform={"capitalize"} fontSize={18} fontWeight={"bold"}>
                        Books List
                    </Typography>
                    <Stack direction={"row"} component={Paper} borderRadius={"10px"}>
                        <IconButton type="button" aria-label="search" size='small'>
                            <Search />
                        </IconButton>
                        <InputBase
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'Search' }}
                            onChange={(event) => handleSearch(event)}
                        />
                    </Stack>
                </Stack>
                <AddToInventory books={data} setData={setData} rowData={rowData} setRowData={setRowData} />
            </Stack>
            <Stack height={"100%"}>
                <ListPaper loading={loading} data={!!(filteredData && filteredData.length > 0)}>
                    <TableData
                        headCells={headCells.length}
                        tableHead={
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={filteredData.length}
                            />
                        }
                        loading={loading}
                        tableBody={
                            filteredData.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            ).map((row) => {
                                const isItemSelected = selected.includes(row.id);
                                const labelId = `enhanced-table-checkbox-${row.id}`;
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        <FixedTableCell>
                                            <Checkbox
                                                onClick={(event) => handleClick(event, row.id)}
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                            />
                                        </FixedTableCell>
                                        <FixedTableCell>
                                            {row.id}
                                        </FixedTableCell>
                                        <FixedTableCell>
                                            {row.name}
                                        </FixedTableCell>
                                        <FixedTableCell>
                                            {row.page_count}
                                        </FixedTableCell>
                                        <FixedTableCell>
                                            {row.author}
                                        </FixedTableCell>
                                        <FixedTableCell>
                                            ${row.price}
                                        </FixedTableCell>

                                        <FixedTableCell>
                                            <Stack direction={"row"} alignItems={"center"} spacing={1}>
                                                <IconActionStyle onClick={() => handleViewDetails(row.id)}>
                                                    <EditOutlined fontSize='small' />
                                                </IconActionStyle>
                                                <IconActionStyle>
                                                    <DeleteOutlined fontSize='small' onClick={() => handleDelete(row.id)} />
                                                </IconActionStyle>

                                            </Stack>
                                        </FixedTableCell>
                                    </TableRow>
                                );
                            })
                        }
                    />
                    <MUITablePagination
                        count={filteredData?.length ?? 0}
                        page={page}
                        onPageChange={handleChangePage}
                    />
                </ListPaper>
            </Stack>
        </Stack>
    );
}