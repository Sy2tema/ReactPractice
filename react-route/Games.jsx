import React from 'react';
//라우터의 종류에는 static, hash, browser router가 있는데 이 중 hash와 browser가 자주 쓰인다.
//static router는 보통 서버측에서 자주 사용된다.
import { HashRouter, BrowserRouter, Route, Link } from 'react-router-dom';
import Gugudan from '../gugudan-game/GugudanGame';
import MineSweeper from '../minesweeper-game/MineSweeperGame';
import NumberBaseball from '../numberbaseball-game/NumberBaseballGameWithHooks';
import Lotto from '../lottery-game/LotteryGameWithHooks';
import Reaction from '../reaction-game/ReactionGameWithHooks';
import RSP from '../rockscissorspaper-game/RockScissorsPaperGameWithHooks';
import TikTekTo from '../tiktekto-game/TikTekToGame';
import WordChain from '../wordchain-game/WordChainGameWithHooks';


//라우터를 사용하기 위해서는 이 react-router-dom라이브러리를 필히 추가적으로 설치해줄 필요가 있다.
const Games = () => {
    //react-router는 눈속임으로서 페이지가 여러개 있는 척하는 역할을 한다.
    //이를 위해 일반적인 태그인 a태그 대신 Link태그를 활용해 원하는 페이지로 전환을 시킨다.
    //Link태그는 a태그와는 달리 페이지를 전환시키는 것이 아닌 해당하는 JSX로의 전환을 시켜주는 역할을 한다.
    return (
        <BrowserRouter>
            <div>
                <Link to='/gugudan-game'>구구단</Link>
                <br/>
                <Link to='/minesweeper-game'>지뢰찾기</Link>
                <br/>
                <Link to='/numberbaseball-game'>숫자야구</Link>
                <br/>
                <Link to='/lottery-game'>로또</Link>
                <br/>
                <Link to='/reaction-game'>반응속도</Link>
                <br/>
                <Link to='/rockscissorspaper-game'>가위바위보</Link>
                <br/>
                <Link to='/tiktekto-game'>틱택토</Link>
                <br/>
                <Link to='/wordchain-game'>끝말잇기</Link>
            </div>
            <div>
                <Route path='/gugudan-game' component={Gugudan}></Route>
                <Route path='/minesweeper-game' component={MineSweeper}></Route>
                <Route path='/numberbaseball-game' component={NumberBaseball}></Route>
                <Route path='/lottery-game' component={Lotto}></Route>
                <Route path='/reaction-game' component={Reaction}></Route>
                <Route path='/rockscissorspaper-game' component={RSP}></Route>
                <Route path='/tiktekto-game' component={TikTekTo}></Route>
                <Route path='/wordchain-game' component={WordChain}></Route>
            </div>
        </BrowserRouter>
    );
};

export default Games;