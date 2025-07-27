if ( typeof window.components === 'undefined' ) {
    window.components = {};
}

document.addEventListener( 'DOMContentLoaded', function() {
    setTimeout( () => {
        document.querySelectorAll( '.component' ).forEach( el => {
            const name = el.getAttribute( 'data-comp' );
            if ( name && window.components[name] ) {
                const component = window.components[name];
                el.innerHTML = component( el.dataset );
                el.classList.remove( 'component' );
            } else {
                console.warn( `Component "${name}" not found.` );
            }
        } );
    }, 1 );
});