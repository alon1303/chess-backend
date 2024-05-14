import Piece from "./Piece.ts";
import {Color, LegalSquare} from "./types/types.ts";
import BoardClass from "./BoardClass.ts";

export default class Pawn extends Piece {
    constructor(x: number, y: number, PieceColor: Color) {
        super(x, y, PieceColor);

    }
    private CheckBlackPawn(x:number, y:number, xDirection:number, yDirection:number, board: Piece[][], LegalSquares:LegalSquare[]):void
    {
        let newX = x + xDirection;
        let newY = y + yDirection;

        if(newX >= 0 && newX < 8 && newY >= 0 && newY < 8)
        {

            if (x === 1 && board[newX][newY]["PieceColor"] === Color.Empty && xDirection === 2){
                LegalSquares.push({x:newX,y:newY})
            }else if(y === newY && board[newX][newY]["PieceColor"] === Color.Empty && xDirection === 1){
                LegalSquares.push({x:newX,y:newY})
            }
            if (board[newX][newY]["PieceColor"] === Color.White && y !== newY){
                LegalSquares.push({x:newX,y:newY})
            }

        }

    }
    private CheckWhitePawn(x:number, y:number, xDirection:number, yDirection:number, board: Piece[][], LegalSquares:LegalSquare[]):void
    {
        let newX = x + xDirection;
        let newY = y + yDirection;


        if(newX >= 0 && newX < 8 && newY >= 0 && newY < 8)
        {



            if (x === 6 && board[newX][newY]["PieceColor"] === Color.Empty && xDirection === -2){
                LegalSquares.push({x:newX,y:newY})
            }else if(y === newY && board[newX][newY]["PieceColor"] === Color.Empty && xDirection === -1){
                LegalSquares.push({x:newX,y:newY})
            }

            if (board[newX][newY]["PieceColor"] === Color.Black && y !== newY){
                LegalSquares.push({x:newX,y:newY})
            }


        }

    }

    GetLegalSquares(board: Piece[][]): LegalSquare[] {
        const LegalSquares: LegalSquare[] = [];

        //every direction the Piece can move towards
        const whitePawnDirections = [
            {xDirection: -1, yDirection:0},
            {xDirection: -2, yDirection:0},
            {xDirection: -1,yDirection: -1},
            {xDirection: -1,yDirection: 1}
        ]
        const blackPawnDirections = [
            {xDirection: 1, yDirection: 0},
            {xDirection: 2, yDirection: 0},
            {xDirection: 1,yDirection: -1},
            {xDirection: 1,yDirection: 1}
        ]
        if (this.PieceColor === Color.White){
            for(let {xDirection, yDirection} of whitePawnDirections)
            {
                this.CheckWhitePawn(this.x, this.y, xDirection, yDirection,board,LegalSquares)
            }
        }
        if (this.PieceColor === Color.Black){
            for(let {xDirection, yDirection} of blackPawnDirections)
            {
                this.CheckBlackPawn(this.x, this.y, xDirection, yDirection,board,LegalSquares)
            }
        }


        return LegalSquares;
    }
}