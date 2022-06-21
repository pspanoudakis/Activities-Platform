import React from "react";
import {useState} from "react";
import {storiesOf} from "@storybook/react";
import {handleUpload} from "../components/UploadImageHandler";

const stories = storiesOf('App Test',module);

stories.add('UploadImage',() => {

    const [file, setFile] = useState("");

    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    function return_url(url) {
        console.log(url);
        alert("UPLOAD COMPLETED");
    }

    return (
        <div>
            <input type="file" onChange={handleChange} accept="/image/*" />
            <button onClick={()=>handleUpload(file,return_url)}>Upload to Firebase</button>
        </div>

    );
})