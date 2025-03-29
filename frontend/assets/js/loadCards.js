const loadCards = [
    { 
        title: 'Reading file',
        description: 'Some info about file',
        components: [
            {
                name: 'File name'
            }
        ]
    },
    { 
        title: 'Delete file',
        description: 'Some info about file',
        components: [
            {
                name: 'File name'
            }
        ]
    },
    { 
        title: 'Rewriting file',
        description: 'Some info about file',
        components: [
            {
                name: 'File name'
            },
            {
                name: 'File data'
            }
        ]
    },
    { 
        title: 'Copy file',
        description: 'Some info about file',
        components: [
            {
                name: 'Src file'
            },
            {
                name: 'Dest file'
            }
        ]
    },
    { 
        title: 'Move file',
        description: 'Some info about file',
        components: [
            {
                name: 'Src file'
            },
            {
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
            element.components
        )
})