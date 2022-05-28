import edgeflarePagesPlugin from "../"

export const onRequest: PagesFunction = edgeflarePagesPlugin({
  config: {
    siteName: "flaregun.net",
    maintenanceMode: {
      enablement: {
        enabled: "enabled",
        scope: "global",
        maintenanceScheduledFor: null,
        maintenanceRoutes: ["flaregun.net"],
        responseCode: 222,
        bypassCode: "test",
      },
      pageOptions: {
        displayOption: "RemoteURL",
        pageUrl: "https://example.com",
        theme: "multilingual",
        themeSiteName: "Network Chimp",
        themeHeadingText: "We're undergoing a bit of scheduled maintenance.",
        themeSubheadingText: "We'll be back.",
        htmlTemplate: "omg local template",
      },
    },
  },
})
