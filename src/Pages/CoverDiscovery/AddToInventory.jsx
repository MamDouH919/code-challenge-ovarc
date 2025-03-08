import { Button, FormControl, InputAdornment, InputBase, InputLabel, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import CustomDialog from '../../Components/Custom/CustomDialog'
import InputText from '../../Components/Custom/InputText';
import InputSelect from '../../Components/Custom/InputSelect';
import { toast } from 'sonner';
import { BiDollar } from 'react-icons/bi';

const AddToInventory = ({
    books,
    setData,
    rowData,
    setRowData
}) => {
    const [open, setOpen] = React.useState(false);
    const [book, setBook] = React.useState("");
    const [price, setPrice] = React.useState("");

    useEffect(() => {
        setOpen(!!rowData);
        setBook(rowData?.author ?? "");
        setPrice(rowData?.name ?? "");
    }, [rowData]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setRowData(null);
        setOpen(false)
    };

    const handleChangePrice = (event) => {
        setPrice(event.target.value);
    };

    const handleChange = (event) => {
        setBook(event.target.value);
    };

    const handleSubmit = () => {


        // Reset input fields
        setBook("");
        setPrice("");
        handleClose();
    };


    return (
        <>
            {open && <CustomDialog
                open={open}
                handleClose={handleClose}
                title={"Add Book to Inventory"}
                content={
                    <Stack spacing={2}>
                        <InputSelect
                            label={"Book"}
                            handleChange={handleChange}
                            value={book}
                            options={books.map(book => ({ value: book.name, label: book.name }))}
                        />
                        <InputText
                            label={"Price"}
                            value={price}
                            handleChange={handleChangePrice}
                            type={"number"}
                            InputProps={
                                {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <BiDollar />
                                        </InputAdornment>
                                    ),
                                }
                            }
                        />
                    </Stack>
                }
                buttonAction={
                    <Button variant='contained' size='small' onClick={handleSubmit}>
                        Submit
                    </Button>
                }
            />}
            <Button variant='contained' size='small' onClick={handleOpen}>
                Add to Inventory
            </Button>
        </>
    )
}

export default AddToInventory