import React from "react";
import styled from "styled-components";

const Board = styled.div`
  .board-row:after {
    clear: both;
    content: "";
    display: table;
  }

  .square {
    background: #fff;
    border: 1px solid #999;
    float: left;
    font-size: 40px;
    font-weight: bold;
    line-height: 40px;
    height: 34px;
    margin-right: -1px;
    margin-top: -1px;
    padding: 5px;
    text-align: center;
    width: 50px;
    height: 50px;
  }

  .square:focus {
    outline: none;
    background: #ddd;
  }
`;

const BoardPage = ({ squares, onClick }) => {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <Board>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </Board>
  );
};

export default BoardPage;
