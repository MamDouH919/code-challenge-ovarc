import { Search } from '@mui/icons-material'
import {
    Box,
    FormControl,
    Grid2 as Grid,
    IconButton,
    InputBase,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Skeleton,
    Stack,
    Typography
} from '@mui/material'
import React, { useContext, useEffect, useReducer } from 'react'
import BookPaper from '../Components/BookPaper';
import { toast } from 'sonner';
import InputSelect from '../Components/Custom/InputSelect';
import { DashboardContext } from '../Context/DashboardContext';


const initialState = {
    loading: true,
    data: [],
    dataFiltered: [],
    authors: [],
    author: "",
    searchQuery: "",
};

function reducer(state, action) {
    return {
        ...state,
        ...action.payload,
    };
}


const ShopBooks = () => {
    const { dispatch: dashboardDispatch } = useContext(DashboardContext);
    const [stateManagement, dispatch] = useReducer(reducer, initialState);

    const handleChange = (event) => {
        dispatch({ payload: { author: event.target.value } });
        const dataFiltered = stateManagement.data.filter(book => book.author === event.target.value);
        if (stateManagement.searchQuery) {
            const dataFiltered = stateManagement.data.filter(book =>
                book.name.toLowerCase().includes(stateManagement.searchQuery)
                || book.page_count.toString().includes(stateManagement.searchQuery)
            );
            dispatch({ payload: { dataFiltered: dataFiltered } });
        } else {
            dispatch({ payload: { dataFiltered: dataFiltered } });
        }
    };

    useEffect(() => {
        dashboardDispatch({ type: "SET_PAGE_NAME", payload: "Shop" })

        dispatch({ payload: { loading: true } });
        fetch('/authors.json')
            .then(response => response.json())
            .then(authorsData => {
                const authors = authorsData.map(author => ({ id: author.id, name: author.first_name + " " + author.last_name }));
                dispatch({
                    payload: {
                        authors: authors,
                    }
                });
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
                            }
                        })
                        dispatch({
                            payload: {
                                data: data,
                                dataFiltered: data,
                                loading: false
                            }
                        });
                    })
                    .catch(() => {
                        toast.error('Error fetching books');
                    });
            })
            .catch(() => {
                toast.error('Error fetching authors');
            });

        return () => {
            dispatch({ type: "SET_PAGE_NAME", payload: "" })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadingStyle = <Grid container spacing={2}>
        {Array.from({ length: 8 }, (_, index) => {
            return (
                <Grid key={index} size={{ xs: 4 }}>
                    <Skeleton animation="wave" width={"100%"} height={"214px"} />
                </Grid>
            );
        })}
    </Grid>


    const handleSearch = (event) => {
        dispatch({ payload: { searchQuery: event.target.value } });
        const dataFiltered = stateManagement.data.filter(book =>
            book.name.toLowerCase().includes(event.target.value)
            || book.page_count.toString().includes(event.target.value)
        );
        dispatch({ payload: { dataFiltered: dataFiltered } });
    };

    return (
        <Stack spacing={3}>
            <Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography textTransform={"capitalize"}>
                        browse books
                    </Typography>
                    <Stack direction={"row"} component={Paper} borderRadius={"10px"}>
                        <IconButton type="button" aria-label="search">
                            <Search />
                        </IconButton>
                        <InputBase
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'Search' }}
                            onChange={(event) => handleSearch(event)}
                        />
                    </Stack>
                </Stack>
                <Stack direction={"row"} spacing={1}>
                    <Box sx={{ minWidth: 120 }} >
                        <InputSelect
                            label={"Author"}
                            handleChange={handleChange}
                            value={stateManagement.author}
                            options={stateManagement.authors.map(author => ({ value: author.name, label: author.name }))}
                        />
                    </Box>
                </Stack>
            </Stack>

            {stateManagement.loading && loadingStyle}
            <Grid container spacing={2}>
                {!stateManagement.loading && stateManagement.dataFiltered.map((book, index) => {
                    return (
                        <Grid key={index} size={{ xs: 4 }}>
                            <BookPaper width={"100%"} bookName={book.name} authorName={book.author} />
                        </Grid>
                    );
                })}
            </Grid>
        </Stack>
    )
}

export default ShopBooks
