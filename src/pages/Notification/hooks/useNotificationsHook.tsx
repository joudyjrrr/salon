import React, { useEffect, useState } from 'react'
import { NotificationQueries } from '../../../API/Notification/NotificationQueries'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { AddNotificationType } from './type'
import { CpManagementQueries } from '../../../API/CpManagement/CpManagementQueries'
import { CountryQueries } from '../../../API/Country/CountryQueries'
import { CityQueries } from '../../../API/City/CityQueries'

const useNotificationsHook = (pageNumber?: number, Query?: string) => {

    const [query, setquery] = useState<string>('')
    const { t } = useTranslation()

    useEffect(() => {
        const time = setTimeout(() => {
            setquery(Query!)
        }, 500)
        return () => clearTimeout(time)
    }, [Query])

    const { control, formState: { errors }, getValues, reset, register, handleSubmit, watch, setValue, setError, clearErrors } = useForm<AddNotificationType>({
        defaultValues: {
            publicUserCity: 'Public',
            customers: []
        }
    });

    const { data: Notifications,
        isFetching
    } = NotificationQueries.GetNotificationCp({ PageNumber: pageNumber, Query: query });

    const {
        mutate: deleteNotification,
        isPending: isDeleting
    } = NotificationQueries.DeleteNotificationCp();

    const {
        mutate: setNotification,
        isPending: isPosting,
    } = NotificationQueries.SetNotificationCp()

    const { data: countries, isLoading: isCountryLoading } = CountryQueries.GetCountryAutoCompleteQuery();
    const country = watch('country');

    const { data: cities, isLoading: isCitiesLoading } = CityQueries.GetCityByCountryQuery({ enabled: country !== undefined, EnablePagination: false, CountryId: country?.id as string, })

    const { data: Customers, isLoading: customerLoading } = CpManagementQueries.useCpCustomersNames();


    return {
        Notifications,
        isFetching,
        t,
        deleteNotification,
        isDeleting,
        setNotification,
        isPosting,
        control,
        register,
        handleSubmit,
        errors,
        watch, setValue, setError, clearErrors, reset, getValues,
        countries, isCountryLoading, cities, isCitiesLoading,
        Customers, customerLoading
    }
}

export default useNotificationsHook