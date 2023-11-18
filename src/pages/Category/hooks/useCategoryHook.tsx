import { CategoryQuery } from "../../../API/Category/CategoryQueries"
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import { AddCategoryType } from "./type";
import { FileQuery } from "../../../API/File/FileQueries";


const useCategoryHook = (pageNumber?: number, Query?: string) => {
    const location = useLocation();
    const params = useParams();
    const id = params.id;
    const { t } = useTranslation();
    const [query, setquery] = useState<string>('')
    const { setValue, register, control, formState: { errors }, handleSubmit, reset, setError, watch } = useForm<AddCategoryType>({
        defaultValues: {
            name: [
                {
                    key: 'ar',
                    value: ''
                },
                {
                    key: 'en',
                    value: ''
                }
            ],
            type: null
        }
    });

    const navigate = useNavigate();

    useEffect(() => {
        const time = setTimeout(() => {
            setquery(Query!);
        }, 500)
        return () => clearTimeout(time)
    }, [Query]);


    const {
        data: allCategories,
        isLoading: allCategoriesIsLoading,

    } = CategoryQuery.GetAllCategoryQuery({ PageNumber: pageNumber, Query: query })
    const { mutate: deleteImage } = FileQuery.DeleteFileQuery();
    const { mutate: mutateImg, isPending: UploadingImg } = FileQuery.SetFileQuery()
    const {
        isPending: isDeletingCategory,
        mutate: deleteCategory,
    } = CategoryQuery.DeleteBannerQuery()
    const { mutate: SetCategory, isPending: isCategoryLoading } = CategoryQuery.SetCategoryQuery();

    const { data: ThisCategory, isLoading: isThisCategoryLoading } = CategoryQuery.GetCategoryByIdQuery(id)

    return {
        allCategories,
        allCategoriesIsLoading,
        t,
        isDeletingCategory,
        deleteCategory,
        control,
        errors,
        navigate,
        register,
        deleteImage,
        mutateImg,
        UploadingImg,
        setValue,
        handleSubmit,
        isCategoryLoading,
        SetCategory,
        location,
        reset,
        setError,
        params,
        ThisCategory,
        watch,
        isThisCategoryLoading
    }
}

export default useCategoryHook