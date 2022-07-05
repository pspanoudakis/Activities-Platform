import React from "react";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { storiesOf } from "@storybook/react";

const stories = storiesOf('App Test',module);

stories.add('LoadingIndicator', () => 
    <div>
        <LoadingIndicator text="Φόρτωση δεδομένων..."/>
    </div>
)
