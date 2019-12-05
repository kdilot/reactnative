import React from "react";
import { MainColor } from "./Color";
import Layout from "constants/Layout";

const DefaultContainerStyle = {
    flex: 1,
    backgroundColor: MainColor,
    justifyContent: "center",
    alignItems: "center"
};

const DefaultViewStyle = {
    padding: 20,
    width: Layout.window.width
};

export { DefaultContainerStyle, DefaultViewStyle };
