import { CategoryQuery } from "../../../API/Category/CategoryQueries"
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";


const useCategoryHook = (pageNumber?: number, Query?: string) => {

    const { t } = useTranslation();
    const [query, setquery] = useState<string>('')
    const { control, formState: { errors } } = useForm();


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
        mutate
    } = CategoryQuery.DeleteBannerQuery()

    return {
        allCategories,
        allCategoriesIsLoading,
        t,
        isDeletingCategory,
        mutate,
        control,
        errors
    }
}

export default useCategoryHook