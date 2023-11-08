import { useState } from "react";
import News from "./components/News";
import Title from "./components/Title";

export interface Film {
  title: string;
  price: number;
}

const App = () => {
  const [shopping, setShopping] = useState<Film[]>([]);
  
  const addFilm = (title: string, price: number): void => {
    const shopping2 = [...shopping];
    shopping2.push({ title, price });
    setShopping(shopping2);
  };


  return (
    <>
      <Title shopping={shopping} />
      <News addFilm={addFilm} />
    </>
  );
};

export default App;
