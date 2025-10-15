import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export function NavigationBar() {
  const { instance } = useMsal();

  const handleLoginRedirect = () => {
    instance.loginRedirect(loginRequest).catch((error) => console.log(error));
  };

  const handleLogoutRedirect = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          AAD Login Test
        </Typography>
        <AuthenticatedTemplate>
          <Button color="inherit" onClick={handleLogoutRedirect}>
            登出
          </Button>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <Button color="inherit" onClick={handleLoginRedirect}>
            登入
          </Button>
        </UnauthenticatedTemplate>
      </Toolbar>
    </AppBar>
  );
}
