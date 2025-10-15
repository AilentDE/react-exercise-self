import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router";

// Msal imports
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import {
  InteractionStatus,
  InteractionType,
  InteractionRequiredAuthError,
  type AccountInfo,
} from "@azure/msal-browser";
import { loginRequest } from "../authConfig";

// Sample app imports
import { ProfileData, type GraphData } from "../components/ProfileData";
import { Loading } from "../components/Loading";
import { ErrorComponent } from "../components/ErrorComponent";
import { callMsGraph } from "../utils/MsGraphApiCall";

// Material-ui imports
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const ProfileContent = () => {
  const { instance, inProgress } = useMsal();
  const [graphData, setGraphData] = useState<null | GraphData>(null);

  useEffect(() => {
    if (!graphData && inProgress === InteractionStatus.None) {
      callMsGraph()
        .then((response) => setGraphData(response))
        .catch((e) => {
          if (e instanceof InteractionRequiredAuthError) {
            instance.acquireTokenRedirect({
              ...loginRequest,
              account: instance.getActiveAccount() as AccountInfo,
            });
          }
        });
    }
  }, [inProgress, graphData, instance]);

  return (
    <Paper>{graphData ? <ProfileData graphData={graphData} /> : null}</Paper>
  );
};

export function Profile() {
  const authRequest = {
    ...loginRequest,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MsalAuthenticationTemplate
        interactionType={InteractionType.Redirect}
        authenticationRequest={authRequest}
        errorComponent={ErrorComponent}
        loadingComponent={Loading}
      >
        <ProfileContent />
      </MsalAuthenticationTemplate>
      <Button component={RouterLink} to="/">
        Back to Home
      </Button>
    </div>
  );
}
