import { Button, FormControl, InputBase, InputLabel, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import CustomDialog from '../../Components/Custom/CustomDialog'
import InputText from '../../Components/Custom/InputText';
import { toast } from 'sonner';



const NewStore = ({
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
    const [address, setAddress] = React.useState("");

    useEffect(() => {
        setOpen(!!rowData);
        setName(rowData?.name ?? "");
        setAddress(rowData?.address_1 ?? "");
    }, [rowData]);

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangeAddress = (event) => {
        setAddress(event.target.value);
    };

    const handleSubmit = () => {
        setData(prev => {
            const newData = [...prev];

            if (rowData) {
                // Editing an existing row
                return newData.map(item =>
                    item.id === rowData.id
                        ? { ...item, name, address_1: address }
                        : item
                );
            } else {
                // Adding a new row
                newData.push({
                    id: newData.length + 1,
                    name,
                    address_1: address
                });
            }
            return newData;
        });

        toast.success(rowData ? 'Store updated successfully' : 'Store added successfully');

        // Reset input fields
        setName("");
        setAddress("");
        handleClose();
    };

    return (
        <>
            <CustomDialog
                open={open}
                handleClose={handleClose}
                title={"New Store"}
                content={
                    <Stack spacing={2}>
                        <InputText
                            label={"Store Name"}
                            placeholder={"Enter store name"}
                            value={name}
                            handleChange={handleChangeName}
                        />
                        <InputText
                            label={"Store Address"}
                            placeholder={"Enter store address"}
                            value={address}
                            handleChange={handleChangeAddress}
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
                Add New Store
            </Button>
        </>
    )
}

export default NewStore