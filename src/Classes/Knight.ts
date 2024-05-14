import Piece from "./Piece.ts";
import {Color, LegalSquare} from "./types/types.ts";
import BoardClass from "./BoardClass.ts";


export default class Knight extends Piece {

    constructor(x: number, y: number, PieceColor: Color) {
        super(x, y, PieceColor);

    }


    public SetX(x: number) {
        this.x = x;
    }


    private CheckSquare(xDirection:number, yDirection:number, board: Piece[][], LegalSquares:LegalSquare[]):void
    {
        const x = this.x + xDirection
        const y = this.y + yDirection
        if(x >= 0 && x < 8 && y >= 0 && y < 8 )
        {
            if(this.PieceColor !== board[x][y]['PieceColor'])
            {
                LegalSquares.push({x:x ,y:y})
            }
        }

    }

    public GetLegalSquares(board: Piece[][]): LegalSquare[] {

        const LegalSquares: LegalSquare[] = [];
        const directions = [
            {xDirection: 2, yDirection:1},
            {xDirection: 2, yDirection:-1},
            {xDirection: 1, yDirection:2},
            {xDirection: 1, yDirection:-2},
            {xDirection: -2, yDirection: -1},
            {xDirection: -2, yDirection: 1},
            {xDirection: -1, yDirection:-2},
            {xDirection: -1, yDirection: 2},
        ]

        for(let {xDirection, yDirection} of directions)
        {
            this.CheckSquare(xDirection, yDirection,board,LegalSquares)
        }

        return LegalSquares;

    }
}