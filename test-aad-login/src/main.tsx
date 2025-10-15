import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { MsalProvider } from "@azure/msal-react";
import {
  PublicClientApplication,
  EventType,
  type EventMessage,
  type AuthenticationResult,
} from "@azure/msal-browser";
import { msalConfig } from "./authConfig";
import "./index.css";

import router from "./AppRouter";

// 創建並導出 msalInstance
export const msalInstance = new PublicClientApplication(msalConfig);

// 初始化後再渲染
msalInstance.initialize().then(() => {
  // 設定帳號邏輯
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }

  // 監聽登入事件
  msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as AuthenticationResult;
      const account = payload.account;
      msalInstance.setActiveAccount(account);
    }
  });

  // 初始化完成後才渲染應用
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <MsalProvider instance={msalInstance}>
        <RouterProvider router={router} />
      </MsalProvider>
    </StrictMode>
  );
});
