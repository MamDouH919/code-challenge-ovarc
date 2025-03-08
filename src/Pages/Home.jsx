import { Skeleton, Stack, Typography } from '@mui/material'
import Details from '../Layouts/Dashboard/Details'
import ButtonLink from '../Components/Custom/ButtonLink'
import { styled } from '@mui/material/styles';
import BookPaper from '../Components/BookPaper';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { DashboardContext } from '../Context/DashboardContext';


const StackStyle = styled(Stack)(({ theme }) => ({
    display: "grid",
    gridAutoFlow: "column", /* Forces items to be laid out in a single row */
    gridGap: "10px", /* Optional: Adds spacing between items */
    overflowX: "scroll", /* Allows horizontal scrolling if items overflow */
    whiteSpace: "nowrap",
    width: "100%",
    paddingBottom: theme.spacing(1),
    MsOverflowStyle: "none", /* Internet Explorer 10+ */
    "&::-webkit-scrollbar": {
        display: "none"
    },
    justifyContent: "start"
}));

const Home = () => {
    return (
        <Stack spacing={3}>
            <Stack spacing={2}>
                <Title title={"Browse by Stores"} to={"/shop/books"} />
                <GridView />
            </Stack>
        </Stack>
    )
}

export default Home


const GridView = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const { dispatch } = useContext(DashboardContext);
    useEffect(() => {
        dispatch({ type: "SET_PAGE_NAME", payload: "Shop" })
        return () => {
            dispatch({ type: "SET_PAGE_NAME", payload: "" })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                            }
                        })
                        setData(data)
                        setLoading(false)
                    })
                    .catch(() => {
                        toast.error('Error fetching books');
                    });
            })
            .catch(() => {
                toast.error('Error fetching authors');
            });
    }, []);

    if (loading) {
        return (
            <StackStyle>
                <Skeleton animation="wave" width={456} height={"214px"} />
                <Skeleton animation="wave" width={456} height={"214px"} />
            </StackStyle>
        );
    }
    return (
        <StackStyle>
            {data.map((book, index) => {
                return (
                    <BookPaper
                        key={index}
                        width={"456px"}
                        bookName={book.name}
                        authorName={book.author}
                    />
                )
            })}
        </StackStyle>
    )
}

const Title = ({
    title,
    to
}) => {
    return (
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <Typography textTransform={"capitalize"}>
                {title}
            </Typography>
            <ButtonLink name={"view all"} to={to} />
        </Stack>
    )
}