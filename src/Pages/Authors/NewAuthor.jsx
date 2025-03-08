import { Button, FormControl, InputBase, InputLabel, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import CustomDialog from '../../Components/Custom/CustomDialog'
import InputText from '../../Components/Custom/InputText';
import { toast } from 'sonner';



const NewAuthor = ({
    setData,
    rowData,
    setRowData
}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setRowData(null);
        setOpen(false)
    };
    const [name, setName] = React.useState("");

    useEffect(() => {
        setOpen(!!rowData);
        setName(rowData?.name ?? "");
    }, [rowData]);

    const handleChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = () => {
        setData(prev => {
            const newData = [...prev];
            if (rowData) {
                // Editing an existing row
                return newData.map(item =>
                    item.id === rowData.id
                        ? { ...item, name, }
                        : item
                );
            } else {
                // Adding a new row
                newData.push({
                    id: newData.length + 1,
                    name,
                });
            }
            return newData;
        });

        toast.success(rowData ? 'Author updated successfully' : 'Author added successfully');

        // Reset input fields
        setName("");
        handleClose();
    };

    return (
        <>
            <CustomDialog
                open={open}
                handleClose={handleClose}
                title={"New Author"}
                content={
                    <Stack spacing={2}>
                        <InputText
                            label={"Author Name"}
                            placeholder={"Enter Author Name"}
                            value={name}
                            handleChange={handleChange}
                        />
                    </Stack>
                }
                buttonAction={
                    <Button variant='contained' size='small' onClick={handleSubmit}>
                        Submit
                    </Button>
                }
            />
            <Button variant='contained' size='small' onClick={handleOpen}>
                Add New Author
            </Button>
        </>
    )
}

export default NewAuthor