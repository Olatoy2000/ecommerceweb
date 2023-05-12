import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactNode } from "react";

export type NextPageX = NextPage & {
  Layout?: (props: { children: ReactNode; [key: string]: any }) => JSX.Element;
  LayoutProps?: { [key: string]: any };
};

export type AppPropsX = AppProps & {
  Component: NextPageX;
};
