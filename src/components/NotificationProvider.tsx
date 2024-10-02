"use client";
import React from "react";
import NotificationsSystem, {
  atalhoTheme,
  NotificationsProvider,
  useNotifications,
} from "reapop";
import { setUpNotifications } from "reapop";

function Notification() {
  // 1. Retrieve the notifications to display, and the function used to dismiss a notification.
  const { notifications, dismissNotification } = useNotifications();
  setUpNotifications({
    defaultProps: {
      position: "top-right",
      dismissible: true,
      dismissAfter: 3000,
      showDismissButton: true
    },
  });

  return (
    <>
      {notifications.length > 0 && (
        <NotificationsSystem
          // 2. Pass the notifications you want Reapop to display.
          notifications={notifications}
          // 3. Pass the function used to dismiss a notification.
          dismissNotification={(id) => dismissNotification(id)}
          // 4. Pass a builtIn theme or a custom theme.
          theme={atalhoTheme}
        />
      )}
    </>
  );
}

export default function NotificationProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NotificationsProvider>
      <Notification />
      {children}
    </NotificationsProvider>
  );
}
