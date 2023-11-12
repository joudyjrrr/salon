import { useForm } from "react-hook-form";
import { SetUserType } from "../../../API/CpManagement/type";


const useCpMngment = () => {
    const { control, handleSubmit, setValue, formState: { isSubmitting }, reset } = useForm<SetUserType>();

    return{
        control,
        setValue,
        
    }

}
export default useCpMngment