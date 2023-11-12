import React, { useEffect, useState } from 'react'
import { NotificationQueries } from '../../../API/Notification/NotificationQueries'
import { useTranslation } from 'react-i18next'

const useNotificationsHook = (pageNumber?: number, Query?: string) => {

    const [query, setquery] = useState<string>('')
    const { t } = useTranslation()

    useEffect(() => {
        const time = setTimeout(() => {
            setquery(Query!)
        }, 500)
        return () => clearTimeout(time)
    }, [Query])

    const { data: Notifications,
        isFetching
    } = NotificationQueries.GetNotificationCp({ PageNumber: pageNumber, Query: query });

    const {
        mutate : deleteNotification,
        isPending : isDeleting
    } = NotificationQueries.DeleteNotificationCp();

    return {
        Notifications,
        isFetching,
        t,
        deleteNotification,
        isDeleting
    }
}

export default useNotificationsHook