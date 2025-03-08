import { Button, FormControl, InputBase, InputLabel, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import CustomDialog from '../../Components/Custom/CustomDialog'
import InputText from '../../Components/Custom/InputText';
import InputSelect from '../../Components/Custom/InputSelect';
import { toast } from 'sonner';



const NewBook = ({
    authors,
    setData,
    rowData,
    setRowData
}) => {
    const [open, setOpen] = React.useState(false);
    const [author, setAuthor] = React.useState( "");
    const [name, setName] = React.useState( "");
    const [pageCount, setPageCount] = React.useState("");

    useEffect(() => {
        setOpen(!!rowData);
        setAuthor(rowData?.author ?? "");
        setName(rowData?.name ?? "");
        setPageCount(rowData?.page_count ?? "");
    }, [rowData]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setRowData(null);
        setOpen(false)
    };

    const handleChangePageCount = (event) => {
        setPageCount(event.target.value);
    };

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChange = (event) => {
        setAuthor(event.target.value);
    };

    const handleSubmit = () => {
        setData(prev => {
            const newData = [...prev];

            if (rowData) {
                // Editing an existing row
                return newData.map(item =>
                    item.id === rowData.id
                        ? { ...item, name, author, page_count: pageCount }
                        : item
                );
            } else {
                // Adding a new row
                newData.push({
                    id: newData.length + 1,
                    name,
                    author,
                    page_count: pageCount
                });
            }
            return newData;
        });

        toast.success(rowData ? 'Book updated successfully' : 'Book added successfully');

        // Reset input fields
        setName("");
        setAuthor("");
        setPageCount("");
        handleClose();
    };


    return (
        <>
            {open && <CustomDialog
                open={open}
                handleClose={handleClose}
                title={"New Book"}
                content={
                    <Stack spacing={2}>
                        <InputText
                            label={"Book Name"}
                            value={name}
                            handleChange={handleChangeName}
                        />
                        <InputText
                            label={"Page Count"}
                            value={pageCount}
                            handleChange={handleChangePageCount}
                            type={"number"}
                        />
                        <InputSelect
                            label={"Author"}
                            handleChange={handleChange}
                            value={author}
                            options={authors.map(author => ({ value: author.name, label: author.name }))}
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
                Add New Book
            </Button>
        </>
    )
}

export default NewBook