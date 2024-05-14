import Piece from "./Piece.ts";
import Pawn from "./Pawn.ts";
import {Color} from "./types/types.ts";
import DefaultPiece from "./DefaultPiece.ts";
import Rook from "./Rook.ts";
import Knight from "./Knight.ts";
import Bishop from "./Bishop.ts";
import Queen from "./Queen.ts";
import King from "./King.ts";
import {log} from "util";



export default class BoardClass {
    board: Piece[][] = [];
    userTurn: string = Color.White;

    constructor() {
        for (let i = 0; i < 8; i++) {
            const row: Piece[] = [];
            for (let j = 0; j < 8; j++) {
                row.push(new DefaultPiece(i,j))
            }
            this.board.push(row);
        }
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {

                if (i === 6) {
                    this.board[i][j] = new Pawn(i,j, Color.White);
                }
                if (i == 7 && (j == 0 || j ==7 )) {
                    this.board[i][j] = new Rook(i,j, Color.White)
                }
                if (i == 7 && (j == 1 || j ==6 )) {
                    this.board[i][j] = new Knight(i,j, Color.White)
                }
                if (i == 7 && (j == 2 || j ==5 )) {
                    this.board[i][j] = new Bishop(i,j, Color.White)
                }
                if (i == 7 && j == 3) {
                    this.board[i][j] = new Queen(i,j, Color.White)
                }
                if (i == 7 && j == 4) {
                    this.board[i][j] = new King(i,j, Color.White)
                }

                if (i === 1) {

                    this.board[i][j] = new Pawn(i,j, Color.Black);
                }
                if (i == 0 && (j == 0 || j ==7 )) {

                    this.board[i][j] = new Rook(i,j, Color.Black)
                }
                if (i == 0 && (j == 1 || j ==6 )) {

                    this.board[i][j] = new Knight(i,j, Color.Black)
                }
                if (i == 0 && (j == 2 || j ==5 )) {

                    this.board[i][j] = new Bishop(i,j, Color.Black)
                }
                if (i == 0 && j == 3) {

                    this.board[i][j] = new Queen(i,j, Color.Black)
                }
                if (i == 0 && j == 4) {

                    this.board[i][j] = new King(i,j, Color.Black)
                }
            }

        }
    }

    public getBoard(){
        return this.board;
    }
    public checkIfMoveValid(x:number,y:number,desX:number,desY:number){
        let isLegal:boolean = false;
        const legalSquares = this.board[x][y].GetLegalSquares(this.board);

        legalSquares.map(square =>{

            if (square.x === desX && square.y === desY){
                isLegal = true;
            }
        })

        return isLegal;
    }
    public MovePiece(x:number,y:number,desX:number,desY:number){

        //before you move any Piece to the next square you need to set its x and y values
        this.board[x][y].SetX(desX)
        this.board[x][y].SetY(desY)

        this.board[desX][desY] = this.board[x][y];
        this.board[x][y] = new DefaultPiece(x,y);

    }



}