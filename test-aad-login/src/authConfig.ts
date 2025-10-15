import type { Configuration, PopupRequest } from "@azure/msal-browser";

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_MSAL_CLIENT_ID,
    authority: `${import.meta.env.VITE_MSAL_AUTHORITY_BASE_URL}/${
      import.meta.env.VITE_AZURE_TENENT_ID
    }`,
    redirectUri: "/",
    postLogoutRedirectUri: "/",
  },
  system: {
    allowPlatformBroker: false, // Disables WAM Broker
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: PopupRequest = {
  // for company setting
  // some method like '/me' will be blocked by company policy
  scopes: [`${import.meta.env.VITE_MSAL_CLIENT_ID}/.default`],
  // for personal setting
  // scopes: ["User.Read", "openid", "profile", "offline_access"],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
