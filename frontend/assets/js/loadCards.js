const loadCards = [
    {
        formId: 'read',
        title: 'Reading file',
        description: 'Some info about file',
        components: [
            {
                type: 'input',
                name: 'File name'
            }
        ]
    },
    { 
        formId: 'delete',
        title: 'Delete file',
        description: 'Some info about file',
        components: [
            {
                type: 'input',
                name: 'File name'
            }
        ]
    },
    { 
        formId: 'rewrite',
        title: 'Rewriting file',
        description: 'Some info about file',
        components: [
            {
                type: 'input',
                name: 'File name'
            },
            {
                type: 'textarea',
                name: 'File data'
            }
        ]
    },
    { 
        formId: 'copy',
        title: 'Copy file',
        description: 'Some info about file',
        components: [
            {
                type: 'input',
                name: 'Src file'
            },
            {
                type: 'input',
                name: 'Dest file'
            }
        ]
    },
    { 
        formId: 'move',
        title: 'Move file',
        description: 'Some info about file',
        components: [
            {
                type: 'input',
                name: 'Src file'
            },
            {
                type: 'input',
                name: 'Dest file'
            }
        ]
    },
]

loadCards.forEach((element) => {
    const cards = document.getElementById("cards");
    cards.innerHTML += 
        Card(
            element.title, 
            element.description,
            element.formId,
            element.components,
        )
})