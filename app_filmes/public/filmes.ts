export interface IDados {
  id: number
  titulo: string
  genero: string
  duracao: number
  preco: number
  foto: string
  sinopse: string
}
export const dados:IDados[] = [
  {
    id: 1,
    titulo: "A Casa Na Praia",
    genero: "Drama, Romance",
    duracao: 90,
    preco: 14.90,
    foto: "a_casa_na_praia.jpg",
    sinopse: "Quando a vida de Clara sai fora de controle, ela regressa à bela Lowcountry para visitar sua mãe. Logo, os ritmos da ilha vão abrindo o coração dela de uma forma maravilhosa, à medida que ela arruma a casa de praia da família."
  },
  {
    id: 2,
    titulo: "Super Mario Bros",
    genero: "Animação, Aventura, Fantasia",
    duracao: 92,
    preco: 21.90,
    foto: "super_mario.jpg",
    sinopse: "Mario é um encanador junto com seu irmão Luigi. Um dia, eles vão parar no reino dos cogumelos, governado pela Princesa Peach, mas ameaçado pelo rei dos Koopas, que faz de tudo para conseguir reinar em todos os lugares."
  },
  {
    id: 3,
    titulo: "Roubo pelos Ares",
    genero: "Suspense, Ação",
    duracao: 110,
    preco: 18.90,
    foto: "roubo_pelos_ares.jpg",
    sinopse: "Uma comissária de bordo e o namorado precisam fazer um roubo para pagar uma dívida, mas o plano pode ir pelos ares depois que o avião é sequestrado."
  },
  {
    id: 4,
    titulo: "A Elefanta do Mágico",
    genero: "Animação, Aventura, Fantasia",
    duracao: 99,
    preco: 19.90,
    foto: "a_elefanta_do_magico.jpg",
    sinopse: "Um garoto aceita o desafio proposto por um rei: realizar três tarefas impossíveis para ganhar uma elefanta mágica e ter a chance de ir atrás de seu destino."
  },
  {
    id: 5,
    titulo: "Esquema de Risco",
    genero: "Ação, Comédia",
    duracao: 114,
    preco: 18.90,
    foto: "esquema_de_risco.jpg",
    sinopse: "O espião Fortune deve impedir a venda de uma tecnologia mortal administrada por um grande negociador de armas. Para isso, ele se junta a um time de elite, incluindo a maior estrela de Hollywood."
  },
  {
    id: 6,
    titulo: "Quatro Amigas Numa Fria",
    genero: "Comédia",
    duracao: 107,
    preco: 15.90,
    foto: "quatro_amigas.jpg",
    sinopse: "Dani está prestes a se casar e viaja com mais três amigas até Bariloche para sua despedida de solteira. As meninas esperam uma viagem divertida e tranquila, mas quando chegam até a cidade argentina as coisas começam a dar errado e o grupo precisa se virar: Karen esquece de reservar um local e, a partir daí, a situação só piora. Juntas, elas precisarão encontrar soluções práticas para seus problemas e viverão aventuras completamente inesperadas."
  },
]