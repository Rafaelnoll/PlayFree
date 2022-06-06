import React, { useState, useEffect } from "react";
import type { NextPage } from 'next'
import Header from '../src/components/Header'
import { CaretRight, Robot } from "phosphor-react";
import GameCard from '../src/components/GameCards/GameCard';
import GameCardExtended from '../src/components/GameCards/GameCardExtended';

import api from "../src/libs/api";
import GameCardImageFull from "../src/components/GameCards/GameCardImageFull";

const recommendedGames = [
  {
    name: "CRSED: F.O.A.D",
    cardImageURL: "https://www.freetogame.com/g/4/thumbnail.jpg"
  },
  {
    name: "Neverwinter",
    cardImageURL: "https://www.freetogame.com/g/11/thumbnail.jpg"
  },
  {
    name: "Word of Warships",
    cardImageURL: "https://www.freetogame.com/g/9/thumbnail.jpg"
  }
]

interface GamesTypes {
  game_url: string;
  id: number;
  short_description: string;
  thumbnail: string;
  title: string;
  genre: string;
}

const Home: NextPage = () => {
  const [recentlyAddedGames, setRecentlyAddedGames] = useState([]);
  const [mostPlayedGames, setMostPlayedGames] = useState([]);

  useEffect(() => {

    api.get("/games")
      .then((response) => {
        const data = response.data;
        const lastGamesOfTheArray = data.slice(-7).reverse();
        setRecentlyAddedGames(lastGamesOfTheArray);
      })
      .catch((err) => {
        console.log(err);
      });

    api.get("/games?sort-by=popularity")
      .then((response) => {
        const data = response.data;
        const mostPlayedGames = data.slice(0, 4);
        setMostPlayedGames(mostPlayedGames);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  return (
    <>
      <Header />
      <main className="py-12">
        <div className="md:max-w-6xl max-w-lg m-auto px-4">
          <h3 className="flex items-center text-[#A1A1AA] gap-1 text-[24px] font-[500] mb-2"><Robot size={32} weight="fill" />Recomendações personalizadas</h3>
          <div className='flex w-full md:gap-4 flex-wrap md:flex-nowrap justify-between items-center'>
            {recommendedGames.map((game) => {
              return <GameCard key={game.name} name={game.name} imageURL={game.cardImageURL} />
            })}
          </div>
        </div>
        <div>
          <div className='flex flex-col md:flex-row justify-between gap-5 md:max-w-6xl max-w-lg m-auto px-4'>
            <div className="md:w-2/3">
              <h3 className='text-[#A1A1AA] gap-1 text-[24px] font-[500] mb-2'>Adicionados recentemente</h3>
              <ul className="flex flex-col">
                {recentlyAddedGames.map((game: GamesTypes) => {
                  return (
                    <li key={game.id}>
                      <GameCardExtended
                        name={game.title}
                        imageURL={game.thumbnail}
                        descrition={game.short_description}
                        genre={game.genre}
                        gameURL={game.game_url}
                      />
                    </li>
                  )
                })}
              </ul>
              <div className="flex justify-end">
                <button className="flex items-center gap-1 justify-center text-[#7a8288] border px-4 py-2 rounded border-[#7a8288] hover:text-[#FFFFFF] hover:border-[#FFFFFF]">
                  <a href="/games">Mais jogos</a>
                  <CaretRight size={15} weight="bold" />
                </button>
              </div>
            </div>
            <div>
              <h3 className='text-[#A1A1AA] gap-1 text-[24px] font-[500] mb-2'>Mais jogados</h3>
              {mostPlayedGames.map((game: GamesTypes) => {
                return <GameCardImageFull key={game.id} imageURL={game.thumbnail} gameURL={game.game_url} />
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
