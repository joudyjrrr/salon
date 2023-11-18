import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import useCategoryHook from './hooks/useCategoryHook';

const EditCategory = () => {

    const { navigate } = useCategoryHook()

    return (
        <>
            <Button onClick={ () => navigate('editCategory')}>
                <EditIcon />
            </Button>
        </>
    )
}

export default EditCategory