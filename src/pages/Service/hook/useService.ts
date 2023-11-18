import { useForm } from "react-hook-form";
import { ServiveInput } from "../../../API/Service/type";

const useService = () => {
  const {
    control,
    setValue,
    register,
    handleSubmit,
    setError,
    watch,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<ServiveInput>();

  
  return {
    control,
    setValue,
    watch,
    handleSubmit,
  };
};
export default useService;
