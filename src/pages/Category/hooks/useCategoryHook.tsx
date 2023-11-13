import { CategoryQuery } from "../../../API/Category/CategoryQueries"
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { AddCategoryType } from "./type";


const useCategoryHook = (pageNumber?: number, Query?: string) => {

    const { t } = useTranslation();
    const [query, setquery] = useState<string>('')
    const { register, control, formState: { errors } } = useForm<AddCategoryType>();

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

    const {
        isPending: isDeletingCategory,
        mutate: deleteCategory,
    } = CategoryQuery.DeleteBannerQuery()

    return {
        allCategories,
        allCategoriesIsLoading,
        t,
        isDeletingCategory,
        deleteCategory,
        control,
        errors,
        navigate,
        register
    }
}

export default useCategoryHook