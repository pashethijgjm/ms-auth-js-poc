async function signIn(){
    const config = {
        // auth: {
        //     clientId: "8faa8733-537f-4dd5-b32b-dcfcf3edc652",
        //     authority: "https://login.microsoftonline.com/ad6c89a6-9fea-42d7-b746-f9f75542d943",
        //     redirectUri: "http://localhost:8080/",
        //   }
        auth: {
                clientId: "1ed7e070-fcee-4fdd-8530-d4cb607a5c72",
                authority: "https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47",
                redirectUri: "https://msauthjs.azurewebsites.net/",
              }
    };

    var client = new msal.PublicClientApplication(config);

    const loginRequest = {
        scopes: ["User.Read"]
      };

     loginResponse =  await client.loginPopup(loginRequest);
      
     console.log('Login Response', loginResponse);

     var tokenRequest = {
        scopes: ["User.Read"],
        account: loginResponse.account
     };

     var tokenResponse = await client.acquireTokenSilent(tokenRequest);

     console.log('Token Response', tokenResponse);

     var graphResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
        headers: {
            'Authorization': `Bearer ${tokenResponse.accessToken}`
        }
     })

     var graphResponseJson = await graphResponse.json();

     console.log('Graph Response', graphResponseJson);

     $("#welcomeContainer").show();
     $("#signInContainer").hide();
     $("#welcomeContainer").removeClass('d-none');

     $("#welcomeText").text('Welcome ' + graphResponseJson.displayName);
     $("#jobTitle").text(graphResponseJson.jobTitle);
     $("#officeLocation").text(graphResponseJson.officeLocation);
     $("#mail").text(graphResponseJson.mail);
     $("#businessPhones").text(graphResponseJson.businessPhones[0]);

}
