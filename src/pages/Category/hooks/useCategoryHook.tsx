import { CategoryQuery } from "../../../API/Category/CategoryQueries"
import { useTranslation } from 'react-i18next';


const useCategoryHook = (pageNumber?: number) => {

    const { t } = useTranslation();
    const {
        data: allCategories,
        isLoading: allCategoriesIsLoading,

    } = CategoryQuery.GetAllCategoryQuery({ PageNumber: pageNumber })

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