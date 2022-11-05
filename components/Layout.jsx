import React from "react";
import Header from "./Header";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import ErrorBoundary from "./ErrorBoundry";

export default function Layout(props) {
    return (
        <Container>
            <ErrorBoundary>
                <Header />
                {props.children}
            </ErrorBoundary>
        </Container>
    );
}
