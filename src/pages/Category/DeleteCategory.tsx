import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { FC, useState } from 'react';
import useCategoryHook from './hooks/useCategoryHook';

const DeleteCategory: FC<{ id: string }> = ({ id }) => {


    const { mutate, isDeletingCategory, t } = useCategoryHook();

    const [Open, setOpen] = useState<boolean>(false)



    const deleteHandler = () => {
        mutate(id, {
            onSuccess: () => {
                setOpen(false);
                // showSuccess(t('Coupon.delete'));
            },
            onError: () => {
                // showError(t('Coupon.wrong'));
            }
        });
        setOpen(false);

    }

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                <DeleteIcon color='error' />
            </Button>

            <Dialog
                open={Open}
                onClose={() => setOpen(true)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {t('delete.title')}
                </DialogTitle>
                <DialogActions>
                    <Button color='info' onClick={() => setOpen(false)}>
                        {t('delete.cancel')}
                    </Button>
                    <Button variant='outlined' color='error' onClick={deleteHandler} disabled={isDeletingCategory}>
                        {t('delete.yes')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeleteCategory