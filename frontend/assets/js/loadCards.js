const loadCards = [
    {
        formId: 'read',
        title: 'Reading file',
        description: 'Some info about file',
        components: [
            {
                type: 'input',
                placeholder: 'File name',
                name: 'file_name'
            }
        ],
        submitFunction: (e) => {
            GetFile(document.read.file_name.value);
            e.preventDefault();
        }
    },
    { 
        formId: 'delete',
        title: 'Delete file',
        description: 'Some info about file',
        components: [
            {
                type: 'input',
                placeholder: 'File name',
                name: 'file_name'
            }
        ],
        submitFunction: (e) => {
            DeleteFile(document.delete.file_name.value);
            e.preventDefault();
        }
    },
    { 
        formId: 'rewrite',
        title: 'Rewriting file',
        description: 'Some info about file',
        components: [
            {
                type: 'input',
                placeholder: 'File name',
                name: 'file_name'
            },
            {
                type: 'textarea',
                placeholder: 'File data',
                name: 'file_data'
            }
        ],
        submitFunction: (e) => {
            RewriteFile(document.rewrite.file_name.value, document.rewrite.file_data.value);
            e.preventDefault();
        }
    },
    // { 
    //     formId: 'copy',
    //     title: 'Copy file',
    //     description: 'Some info about file',
    //     components: [
    //         {
    //             type: 'input',
    //             name: 'Src file'
    //         },
    //         {
    //             type: 'input',
    //             name: 'Dest file'
    //         }
    //     ]
    // },
    // { 
    //     formId: 'move',
    //     title: 'Move file',
    //     description: 'Some info about file',
    //     components: [
    //         {
    //             type: 'input',
    //             name: 'Src file'
    //         },
    //         {
    //             type: 'input',
    //             name: 'Dest file'
    //         }
    //     ]
    // },
]

const cards = document.getElementById("cards");
loadCards.forEach((element) => {
    cards.innerHTML += 
        Card(
            element.title, 
            element.description,
            element.formId,
            element.components,
            element.submitFunction
        )
})
loadCards.forEach((element) => {
    document[element.formId].addEventListener("submit", (e) => {element.submitFunction(e)});
})