import { CategoryQuery } from "../../../API/Category/CategoryQueries"


const useCategoryHook = (pageNumber: number) => {

    const {
        data: allCategories,
        isLoading: allCategoriesIsLoading,

    } = CategoryQuery.GetAllCategoryQuery({ PageNumber: pageNumber })

    return {
        allCategories,
        allCategoriesIsLoading
    }
}

export default useCategoryHook