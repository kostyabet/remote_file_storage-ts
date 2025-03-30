function GetFile(fileName) {
    fetch(`http://localhost:3000/files?fileName=${fileName}`, {
            method: "GET"
        })
        .then(response => {
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status + " " + response.statusText}`);
            return response.json();
        })
        .then(file => alert(file.message.toString() + "\nData:" + file.data))
        .catch(error => alert(error))
}

function DeleteFile(fileName) {
    fetch(`http://localhost:3000/files?fileName=${fileName}`, {
            method: "DELETE"
        })
        .then(response => {
            console.log(response)
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status + " " + response.statusText}`);
            return response.json();
        })
        .then(file => alert(file.message.toString() + "\nData:" + file.filePath))
        .catch(error => alert(error))
}

function RewriteFile(fileName, fileData) {
    fetch(`http://localhost:3000/files?fileName=${fileName}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fileData)
        })
        .then(response => {
            console.log(response)
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status + " " + response.statusText}`);
            return response.json();
        })
        .then(file => alert(file.message.toString() + "\nData:" + file.filePath))
        .catch(error => alert(error))
}