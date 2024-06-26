import { IDados } from "../../public/filmes";
import { dados } from "../../public/filmes";
import { useState, useEffect } from "react";
import CardFilm from "./CardFilme";

interface PropsNews {
  addFilm: (title:string, price: number) => void 
}

const News: React.FC<PropsNews> = (props) => {
  const [filmes, setFilmes] = useState<IDados[]>([]);

  useEffect(() => {
    setFilmes(dados);
  }, []);

  const listFilmes = filmes.map((filme: IDados) => (
    <CardFilm
      key={filme.id}
      titulo={filme.titulo}
      genero={filme.genero}
      sinopse={filme.sinopse}
      foto={filme.foto}
      preco={filme.preco}
      duracao={filme.duracao}
      addFilm={props.addFilm}
    />
  ));

  return (
    <>
      <div className="container mt-3">
        <h3>Novidades: Filmes disponiveis para alugar</h3>
        <div className="row">{listFilmes}</div>
      </div>
    </>
  );
};

export default News;
