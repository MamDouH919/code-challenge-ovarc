import { Button, FormControl, InputBase, InputLabel, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import CustomDialog from '../../Components/Custom/CustomDialog'
import InputText from '../../Components/Custom/InputText';
import InputSelect from '../../Components/Custom/InputSelect';
import { toast } from 'sonner';

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
        setData(prev => {
            const newData = [...prev];

            if (rowData) {
                // Editing an existing row
                return newData.map(item =>
                    item.id === rowData.id
                        ? { ...item, name, book, price }
                        : item
                );
            } else {
                // Adding a new row
                newData.push({
                    id: newData.length + 1,
                    book,
                    price
                });
            }
            return newData;
        });

        toast.success(rowData ? 'Book updated successfully' : 'Book added successfully');

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
                            label={"Price"}
                            handleChange={handleChange}
                            value={book}
                            options={books.map(book => ({ value: book.name, label: book.name }))}
                        />
                        <InputText
                            label={"Book Name"}
                            value={name}
                            handleChange={handleChangePrice}
                            type={"number"}
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