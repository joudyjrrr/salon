import { Button } from "@mui/material"
import useCategoryHook from "./hooks/useCategoryHook"
import { useState } from "react"

const AddCategory = () => {

    const [Open, setOpen] = useState(false);


    const {
        t,
    } = useCategoryHook();

    return (
        <>
            

        </>
    )
}

export default AddCategory