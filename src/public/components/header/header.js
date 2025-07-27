window.components.Header = ( props ) => {
    const renderActions = () => {
        if ( !props.actions ) {
            return '';
        }
        let result = '';
        props.actions.map( ( action, index ) => {
            result += `<div class="action ` + ( action.className || '' ) + `" onclick="` + ( action.onClick && action.onClick ) + `">
                ` + ( action.icon && ( action.icon.startsWith( '<' ) ? action.icon : `<i data-lucide="` + action.icon + `"></i>` ) )  + `
                ` + ( action.text ? action.text : '' ) + `
            </div>`;
        })
        return result;
    };
    return `<header class="header">
        <a href="` + ( props.link || '#!' ) + `">
            <img src="` + ( props.logo || 'https://klikdevai.com/wp-content/uploads/2025/04/klik-logo.png' ) + `" />
        </a>
        <h1>
            <span>` + props.title + `</span>
            <small>` + props.subtitle + `</small>
        </h1>
        <div class="actions">
            ` + renderActions() + `
        </div>
    </header>
    `;
};