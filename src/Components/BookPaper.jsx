import { Paper, Stack, Typography } from '@mui/material'
import React from 'react'

import { styled } from '@mui/material/styles';
import StoresPaper from './StoresPaper';

const StackNameStyle = styled(Stack)(() => ({
    height: "100%",
    width: "125px",
    minWidth: "125px",
    backgroundColor: "#FFEBE1",
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
    borderTopRightRadius: "3px",
    borderBottomRightRadius: "3px",
    justifyContent: "center",
    alignItems: "center",
}));

const TypographyStyle = styled(Typography)(() => ({
    textTransform: "capitalize",
    textWrap: "wrap",
    textAlign: "center",
}));

const BookPaper = ({
    width,
    bookName,
    authorName
}) => {
    return (
        <Stack
            component={Paper}
            width={width ?? "100%"}
            p={1}
            borderRadius={"10px"}
            height={"214px"}
            direction={"row"}
            spacing={1}
        >
            <StackNameStyle>
                <TypographyStyle variant='body1'>
                    To Kill a Mockingbird
                </TypographyStyle>
            </StackNameStyle>
            <Stack justifyContent={"space-between"}>
                <Stack>
                    <Typography fontSize={14} lineHeight={1}>
                        {bookName}
                    </Typography>
                    <Typography variant={"caption"} color={"text.secondary"}>
                        by {authorName}
                    </Typography>
                </Stack>
                <StoresPaper name={"Cover Discovery"} price={"$10.99"} />
            </Stack>
        </Stack>
    )
}

export default BookPaper