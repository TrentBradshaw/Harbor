import React from 'react';

function FileUploadComponent({ updateImage }) {
    function createImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            updateImage(e.target.result);
        };
        reader.readAsDataURL(file);
    }
    function onChange(e) {
        const files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        createImage(files[0]);
    }

    return (
        <input
            id="postFileField"
            type="file"
            onChange={(e) => onChange(e)}
            name="postFile"
        />
    );
}

export default FileUploadComponent;
