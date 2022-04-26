import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { ContextWrapper } from "./components";

// Call make Server
makeServer();

const rootElement = document.getElementById("root");
ReactDOM.render(
    <React.StrictMode>
        <ContextWrapper>
            <App />
        </ContextWrapper>
    </React.StrictMode>,
    rootElement
);
