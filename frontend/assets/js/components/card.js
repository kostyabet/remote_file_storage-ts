function Card(
    title, 
    description,
    formId,
    components = [],
    submitFunction,
    sendButtonValue = "Send",
    resetButtonValue = "Reset"
) {
    return `
        <div class="card">
            <h2 class="title">${title}</h2>
            <p class="description">${description}</p>
            <form id="${formId}" name="${formId}">
                ${components.length ? 
                    components.map((component) => 
                        component?.type === 'input'
                            ? `<input name="${component.name}" placeholder="${component.placeholder}" required/>`
                            : `<textarea placeholder="${component.placeholder}"></textarea>`
                    ).reduce((prev, cur) => prev += cur)
                    : `<h4>No one input</h4>`
                }
                <div class="flex-row">
                    <input name="send" type="submit" value="${sendButtonValue}" />
                    <input name="reset" type="reset" value="${resetButtonValue}" />
                </div>
            </form>
        </div>
    `;
}