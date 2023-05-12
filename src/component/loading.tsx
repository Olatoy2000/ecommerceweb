import { LoadingOverlay } from "@mantine/core";
import React from "react";

const Loading =({ loading }: any) => {
    return <LoadingOverlay visible={loading} overlayBlur={5} />
}

export default Loading;