import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const IconButtonStyle = styled(Stack)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    width: "30px",
    height: "30px",
    borderRadius: "4px",
    color: theme.palette.primary.contrastText,
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
    },
}));

const IconActionStyle = ({
    children,
    onClick
}) => {
    return (
        <IconButtonStyle onClick={onClick}>
            {children}
        </IconButtonStyle>
    )
}

export default IconActionStyle