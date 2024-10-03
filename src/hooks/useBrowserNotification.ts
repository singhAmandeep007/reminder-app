import { useEffect } from "react";

import { setupIndexedDB, TIDBConfig, useIndexedDBStore } from "./useIDB";

/**
 * IndexedDB Notification Entity
 */
type TBrowserNotificationRecord = {
  /**
   * Notification ID (unique)
   */
  id: string;
  /**
   * Last notified timestamp
   */
  lastNotified: number;
  /**
   * Number of times notified
   */
  notificationCount: number;
};

/**
 * Browser Notification Entity
 */
export type TBrowserNotification = {
  /**
   * Notification ID (unique)
   */
  id: string;
  /**
   * Notification due date
   */
  dueDate: Date;
  /**
   * Notification title
   */
  title: string;
  /**
   * Number of times to repeat the notification
   *
   * @default 1
   *
   * min: 1
   */
  repeatTimes?: number;
  /**
   * Interval to repeat the notification
   *
   * @default 300000 (5 minutes)
   *
   * min: 300000 (5 minutes)
   */
  repeatInterval?: number;
  /**
   * Notification options
   * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/notifications/NotificationOptions
   */
  options?: NotificationOptions;
};

/**
 * Browser Notification Hook Props
 */
type TUseBrowserNotificationProps = {
  /**
   * Array of notifications entities to be notified
   */
  notifications: Array<TBrowserNotification>;
  /**
   * Will keep on checking for notifications entities ready to be notified/shown after this interval.
   *
   * Interval to check the notifications
   * @default 10000 (10 seconds)
   *
   * min: 1000 (1 second)
   */
  checkInterval?: number;
};

export const DB_NAME = "browser-notifications-db";
export const STORE_NAME = "notificationRecords";

const checkBrowserNotificationSupport = (): boolean => {
  return "Notification" in window;
};

const requestBrowserNotificationPermission = async (): Promise<boolean> => {
  if (!checkBrowserNotificationSupport()) {
    // eslint-disable-next-line no-console
    console.log("Browser does not support notifications.");
    return false;
  }

  const permission = await Notification.requestPermission();
  return permission === "granted";
};

const showNotification = async (title: string, options: NotificationOptions) => {
  const isPermissionGranted = await requestBrowserNotificationPermission();

  if (!isPermissionGranted) {
    return;
  }

  new Notification(title, options);
};

// IndexedDB Configuration
const IDB_CONFIG: TIDBConfig = {
  databaseName: DB_NAME,
  version: 1,
  stores: [
    {
      name: STORE_NAME,
      id: { keyPath: "id" },
      indices: [
        { name: "lastNotified", keyPath: "lastNotified" },
        { name: "notificationCount", keyPath: "notificationCount" },
      ],
    },
  ],
};

export const useBrowserNotification = ({ notifications, checkInterval = 10000 }: TUseBrowserNotificationProps) => {
  if (checkInterval < 1000) {
    throw new Error("checkInterval must be equal or greater than 1 second (1000ms)");
  }

  useEffect(() => {
    setupIndexedDB(IDB_CONFIG).catch(
      // eslint-disable-next-line no-console
      (e) => console.log("IndexedDB not supported", e)
    );
  }, []);

  const { add, getByID, update } = useIndexedDBStore<TBrowserNotificationRecord>(STORE_NAME);

  useEffect(() => {
    const showNotifications = async (notifications: TBrowserNotification[]) => {
      const now = new Date().getTime();

      for (const notification of notifications) {
        const record = await getByID(notification.id);
        const repeatTimes = notification.repeatTimes ?? 1;
        const repeatInterval = notification.repeatInterval ?? 60000 * 5;

        // if due date has elapsed
        if (notification.dueDate.getTime() < now) {
          // if record already exists in idb
          if (record) {
            // if number of times to notify is greater than number of times already notified
            if (repeatTimes > record.notificationCount) {
              // if repeat interval has elapsed since last notification was shown
              if (repeatInterval < now - record.lastNotified) {
                showNotification(notification.title, notification.options ?? {});
                // update record
                await update({
                  id: notification.id,
                  lastNotified: now,
                  notificationCount: record.notificationCount + 1,
                });
              }
            }
          } else {
            // if record does not exist in idb, notification is shown for the first time
            showNotification(notification.title, notification.options ?? {});

            await add({
              id: notification.id,
              lastNotified: now,
              notificationCount: 1,
            });
          }
        }
      }
    };

    function init() {
      const intervalId = setInterval(() => showNotifications(notifications), checkInterval);

      return () => {
        clearInterval(intervalId);
      };
    }

    const unsubscribe = init();

    // cleanup
    return () => {
      unsubscribe();
    };
  }, [add, update, getByID, notifications, checkInterval]);
};
