function Card(
    title, 
    description,
    formId,
    components = [],
    sendButtonValue = "Send",
    resetButtonValue = "Reset"
) {
    return `
        <div class="card">
            <h2 class="title">${title}</h2>
            <p class="description">${description}</p>
            <form id=${formId}>
                ${components.length ? 
                    components.map((component) => 
                        component?.type === 'input'
                            ? `<input placeholder="${component.name}"/>`
                            : `<textarea placeholder="${component.name}"></textarea>`
                    ).reduce((prev, cur) => prev += cur)
                    : `<h4>No one input</h4>`
                }
                <div class="flex-row">
                    <button type="submit">${sendButtonValue}</button>
                    <button type="reset">${resetButtonValue}</button>
                </div>
            </form>
        </div>
    `;
}