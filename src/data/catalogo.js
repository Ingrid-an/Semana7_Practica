// Catálogo "pesado" generado en memoria para el Paso 4 (5 000 elementos)
const GENEROS = ['Pop', 'Indie', 'Jazz', 'Lo-fi', 'Rock', 'Reggaetón', 'Clásica', 'Podcast']
const PALABRAS = ['Luna', 'Rosa', 'Noche', 'Eco', 'Brillo', 'Mar', 'Sueño', 'Latido', 'Neón', 'Calma', 'Lluvia', 'Fuego']
const ADJETIVOS = ['dorada', 'eterna', 'lejana', 'en calma', 'de abril', 'sin fin', 'azul', 'rosa', 'de verano', 'nocturna', 'perdida']
const ARTISTAS = ['Valeria Ríos', 'Los Andes Club', 'Mika Sol', 'Dúo Coral', 'Nina Vega', 'Radio Huanca', 'Aurora Beat', 'Café Podcast']

export const CATALOGO = Array.from({ length: 5000 }, (_, i) => ({
  id: i + 1,
  titulo: `${PALABRAS[i % PALABRAS.length]} ${ADJETIVOS[(i * 7) % ADJETIVOS.length]} ${i + 1}`,
  artista: ARTISTAS[(i * 3) % ARTISTAS.length],
  genero: GENEROS[(i * 5) % GENEROS.length],
  duracion: `${2 + (i % 4)}:${String((i * 13) % 60).padStart(2, '0')}`,
}))

export const GENEROS_CATALOGO = ['Todos', ...GENEROS]
