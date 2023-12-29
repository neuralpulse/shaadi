document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const captureButton = document.getElementById('capture');
    const uploadButton = document.getElementById('upload');

    let stream;
    let isCaptured = false;

    // Access user's camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((mediaStream) => {
            stream = mediaStream;
            video.srcObject = mediaStream;
        })
        .catch((error) => {
            console.error('Error accessing camera:', error);
        });

    // Capture photo from video stream
    captureButton.addEventListener('click', () => {
        if (stream) {
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            isCaptured = true;
            uploadButton.removeAttribute('disabled');
        }
    });

    // Upload photo to the server
    uploadButton.addEventListener('click', () => {
        if (isCaptured) {
            const imageDataURL = canvas.toDataURL('image/png');

            // Send the image data to the server
            fetch('https://vikramj.com/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: imageDataURL }),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Image uploaded successfully:', data);
                // Optionally, you can add UI feedback for successful upload
            })
            .catch((error) => {
                console.error('Error uploading image:', error);
                // Optionally, you can add UI feedback for upload failure
            });
        }
    });
});

