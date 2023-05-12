import { StateProvider } from "@/src/store/useGlobalState";
import { AppPropsX } from "@/types/next";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import  "../styles/global.css"


export const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppPropsX) {
  const GivenLayout = Component.Layout;
  const DefaultLayout = ({ children }: { children: ReactNode }) => (
    <>{children}</>
  );
  const Layout = GivenLayout || DefaultLayout;
  const layoutProps = Component.LayoutProps || {};
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <StateProvider>
        <MantineProvider theme={{ loader: "oval" }}>
            <ModalsProvider>
              <Notifications position="top-right" />        
                <Layout {...layoutProps}>
                  <Component {...pageProps} />
                </Layout>
            </ModalsProvider>
        </MantineProvider>
        </StateProvider>
    </QueryClientProvider>
        
  )
}