import Piece from "./Piece.ts";
import {Color, LegalSquare} from "./types/types.ts";
import BoardClass from "./BoardClass.ts";

export default class Queen extends Piece {

    constructor(x: number, y: number, PieceColor: Color) {
        super(x, y, PieceColor);
    }
    private CheckSquare(x:number, y:number, xDirection:number, yDirection:number, board: Piece[][], LegalSquares:LegalSquare[]):void
    {
        x = x + xDirection
        y = y + yDirection
        if(x >= 0 && x < 8 && y >= 0 && y < 8)
        {


            if(board[x][y]['PieceColor'] === Color.Empty)
            {
                LegalSquares.push({x:x ,y:y})
                this.CheckSquare(x, y,xDirection,yDirection,board,LegalSquares)
            }else if(this.PieceColor !== board[x][y]['PieceColor'])
            {
                LegalSquares.push({x:x ,y:y})
            }

        }

    }

    GetLegalSquares(board: Piece[][]): LegalSquare[] {
        const LegalSquares: LegalSquare[] = [];
        //every direction the Piece can move towards
        const directions = [
            {xDirection: 1, yDirection:1},
            {xDirection: -1, yDirection:-1},
            {xDirection: -1, yDirection:1},
            {xDirection: 1, yDirection:-1},
            {xDirection: 1, yDirection:0},
            {xDirection: -1, yDirection:0},
            {xDirection: 0, yDirection:1},
            {xDirection: 0, yDirection:-1},
        ]

        for(let {xDirection, yDirection} of directions)
        {
            this.CheckSquare(this.x, this.y, xDirection, yDirection,board,LegalSquares)
        }

        return LegalSquares;
    }



}