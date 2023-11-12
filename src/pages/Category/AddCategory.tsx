import { Button } from "@mui/material"
import { Link } from "react-router-dom"

const AddCategory = () => {

    

    return (
        <>
            <Button variant="contained">
                <Link to={'add'} color="white">
                    Add
                </Link>
            </Button>
        </>
    )
}

export default AddCategory