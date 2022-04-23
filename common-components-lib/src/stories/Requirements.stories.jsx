import React from "react";
import {storiesOf} from "@storybook/react";
import {TestComponent} from "../components/test-component";

const stories = storiesOf('App Test',module);

stories.add('App',() => {

    return <TestComponent/>;
});