document.addEventListener("DOMContentLoaded", function() {
    const folderSelector = document.getElementById("folder-selector");
    const selectFolderBtn = document.getElementById("select-folder-btn");
    const videoList = document.getElementById("video-list");
    const videoPlayer = document.getElementById("video-player");
    const folderName = document.getElementById("folder-name");

    selectFolderBtn.addEventListener("click", function() {
        folderSelector.click();
    });

    folderSelector.addEventListener("change", function(event) {
        const files = event.target.files;
        const videos = [];
        let folder = "";
        for (const file of files) {
            if (file.type.startsWith("video/")) {
                videos.push({name: file.name, path: URL.createObjectURL(file)});
            } else if (file.webkitRelativePath) {
                // Extract folder name from the first file's path
                const folders = file.webkitRelativePath.split("/");
                folder = folders[0];
            }
        }
        displayVideos(videos);
        displayFolderName(folder);
    });

    videoList.addEventListener("click", function(event) {
        if (event.target.tagName === "LI") {
            const videoPath = event.target.getAttribute("data-path");
            videoPlayer.src = videoPath;
            videoPlayer.play();
        }
    });

    // Function to display videos in the list
    function displayVideos(videos) {
        videoList.innerHTML = "";
        videos.forEach((video, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = video.name;
            listItem.setAttribute("data-path", video.path);
            videoList.appendChild(listItem);
        });
    }

    // Function to display folder name
    function displayFolderName(folder) {
        folderName.textContent = `Videos in Folder: ${folder}`;
    }
});