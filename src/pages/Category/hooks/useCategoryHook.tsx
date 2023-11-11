import { CategoryQuery } from "../../../API/Category/CategoryQueries"
import { useTranslation } from 'react-i18next';


const useCategoryHook = (pageNumber?: number, Query?: string) => {

    const { t } = useTranslation();
    console.log(Query);

    const {
        data: allCategories,
        isLoading: allCategoriesIsLoading,

    } = CategoryQuery.GetAllCategoryQuery({ PageNumber: pageNumber, Query: Query })

    const {
        isPending: isDeletingCategory,
        mutate
    } = CategoryQuery.DeleteBannerQuery()

    return {
        allCategories,
        allCategoriesIsLoading,
        t,
        isDeletingCategory,
        mutate
    }
}

export default useCategoryHook