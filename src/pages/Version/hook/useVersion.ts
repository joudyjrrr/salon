import { useForm } from "react-hook-form";
import { VersionGet, VersionInput } from "../../../API/Version/type";




const useVersion = ()=>{
    const {
        control,
        setValue,
        register,
        handleSubmit,
        setError,
        watch,
        reset,
      } = useForm<VersionInput>();
      return {
        control,
        setValue,
        handleSubmit
      }

}
export default useVersion