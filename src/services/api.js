// Endpoints públicos usados en los pasos 2 y 5

// Álbumes (los usamos como "canciones") y usuarios (como "artistas")
export const URL_CANCIONES = 'https://jsonplaceholder.typicode.com/albums?_limit=12'
export const URL_ARTISTAS = 'https://jsonplaceholder.typicode.com/users'

// Endpoints de prueba de DummyJSON: responden con el código HTTP que pidas
export const URL_EXITO = 'https://dummyjson.com/http/200/Canciones_cargadas'
export const URL_ERROR_404 = 'https://dummyjson.com/http/404/Cancion_no_encontrada'

// Le da forma de canción a un álbum de JSONPlaceholder
const GENEROS = ['Pop', 'Indie', 'Jazz', 'Lo-fi', 'Rock', 'Podcast']
export const albumACancion = (album) => ({
  id: album.id,
  titulo: album.title.charAt(0).toUpperCase() + album.title.slice(1),
  artista: `Artista ${album.userId}`,
  genero: GENEROS[album.id % GENEROS.length],
})
