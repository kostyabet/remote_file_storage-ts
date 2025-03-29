function Card(
    title, 
    description,
    components = [],
    sendButtonValue = "Send"
) {
    console.log(components)
    return `
        <div class="card">
            <h2 class="title">${title}</h2>
            <p class="description">${description}</p>
            <form>
                ${components.length ? 
                    components.map((component) => 
                        `<input placeholder="${component.name}"/>`
                    ).reduce((prev, cur) => prev += cur)
                    : `<h4>No one input</h4>`
                }
                <button type="submit">${sendButtonValue}</button>
            </form>
        </div>
    `;
}