import React, { useEffect, useRef } from 'react';
import Game from './Game';
import './Jump.scss';

export default function Jump() {
  const containerDom = useRef(null);
  const game = useRef(null);

  const startpage = useRef(null);
  const restartpage = useRef(null);
  const startBtn = useRef(null);
  const restartBtn = useRef(null);
  const scoreEl = useRef(null);

  useEffect(() => {
    game.current = new Game(containerDom.current);
    startpage.current.style.display = 'flex';
    restartpage.current.style.display = 'none';
    game.current.failCallback = function(score) {
      restartpage.current.style.display = 'flex';
      scoreEl.current.innerHTML = score;
    };
  }, []);

  return (
    <div ref={containerDom} className="jump">
      <div className="page startPage" ref={startpage}>
        <div
          className="startBtn button"
          ref={startBtn}
          onClick={() => {
            startpage.current.style.display = 'none';
            game.current.start();
          }}
        >
          开始游戏
        </div>
      </div>
      <div className="page restartPage" ref={restartpage}>
        <p>
          游戏得分：<span className="scoreNum" ref={scoreEl} />{' '}
        </p>
        <div
          className="restartBtn button"
          onClick={() => {
            restartpage.current.style.display = 'none';
            game.current.restart();
          }}
          ref={restartBtn}
        >
          重新开始
        </div>
      </div>
    </div>
  );
}
