import { normalize, schema, } from 'normalizr'


const schemaAuthor = new schema.Entity('author');


const schemaMensaje = new schema.Entity('mensaje', { author: schemaAuthor }, { idAttribute: 'id' })


const normalizarMensajes = (mensajesConId) => normalize(mensajesConId, schemaMensaje)

async function normalizadorMensajes(mensajes) {
    const normalizados = normalizarMensajes( {id: 'mensajes' , mensajes})
    return normalizados
}

export {normalizadorMensajes}