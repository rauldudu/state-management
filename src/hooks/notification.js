import { useContext, useCallback } from 'react'
import { NotificationContext } from '../contexts/Notification'

export const useNotification = () => {
  const notification = useContext(NotificationContext)
  return useCallback(params => notification.addNotification(params), [
    notification
  ])
}
