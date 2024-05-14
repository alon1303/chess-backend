
import {Color, LegalSquare} from "./types/types.ts";
import BoardClass from "./BoardClass.ts";



export default abstract class Piece {

    protected x: number;
    protected y: number;
    protected PieceColor: Color;



    protected constructor(x: number,y: number, PieceColor: Color) {
        this.x = x;
        this.y = y;
        this.PieceColor = PieceColor;


    }


    public SetX(x:number):void{
        this.x = x;
    }
    public SetY(y:number):void {
        this.y = y;
    }


    public abstract GetLegalSquares(board: Piece[][]):LegalSquare[]
}
