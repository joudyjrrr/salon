import { FC, useState } from 'react'

import DeleteModal from '../../Components/DeleteModal';
import useNotificationsHook from './hooks/useNotificationsHook';
import { showError } from '../../libs/toast/Tostify';


const DeleteNotification: FC<{ id: string }> = ({ id }) => {

    const [Open, setOpen] = useState(false);

    const { deleteNotification, isDeleting, t } = useNotificationsHook();
    const deleteHandler = () => {
        deleteNotification(id, {
            onSuccess: () => {
                setOpen(false)
            },
            onError: () => {
                showError(t('sad'))
            }
        })
    }

    return (
        <>
            <DeleteModal
                Open={Open}
                setOpen={setOpen}
                deleteFn={deleteHandler}
                isLoading={isDeleting}
            />

        </>
    )
}

export default DeleteNotification