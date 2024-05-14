import Piece from "./Piece.ts";
import {Color, LegalSquare} from "./types/types.ts";
import BoardClass from "./BoardClass.ts";

export default class DefaultPiece extends Piece {

    constructor(x: number, y: number) {
        super(x, y,Color.Empty);


    }
    public CheckPieceMove(x: number, y: number): boolean {

        return Math.abs(this.x - x) == 2 &&  Math.abs(this.y - y) == 1 ||
            Math.abs(this.x - x) == 1 &&  Math.abs(this.y - y) == 2;
    }

    GetLegalSquares(board: Piece[][]): LegalSquare[] {
        return [];
    }




}