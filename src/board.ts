// Define the types of chess pieces
enum PieceType {
  Pawn,
  Rook,
  Knight,
  Bishop,
  Queen,
  King,
}

// Define the colors of chess pieces
enum PieceColor {
  White,
  Black,
}

// Define the structure of a chess piece
interface Piece {
  type: PieceType;
  color: PieceColor;
}

// Define the structure of a board position
type Position = [number, number]; // [row, column]

const defaultFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

class Board {
  private board: (Piece | null)[][];
  private turn: number;
  private castlingRights: string;
  private enPassantTarget: string;
  private halfMoveClock: number;
  private fullMoveNumber: number;


  constructor(fen: string = defaultFEN) {
    const [boardPart, turn, castling, enPassant, halfMove, fullMove] = fen.split(' ');
    this.board = this.parseFEN(boardPart);
    this.turn = turn === 'b' ? 1 : 0; // 0 for white, 1 for black
    this.castlingRights = castling;
    this.enPassantTarget = enPassant;
    this.halfMoveClock = parseInt(halfMove);
    this.fullMoveNumber = parseInt(fullMove);
  }

  private parseFEN(fen: string): (Piece | null)[][] {
    const board: (Piece | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));
    const [piecePlacement] = fen.split(' ');
    const rows = piecePlacement.split('/');

    for (let i = 0; i < 8; i++) {
      let col = 0;
      for (const char of rows[i]) {
        if (/\d/.test(char)) {
          col += parseInt(char, 10);
        } else {
          const piece = this.fenCharToPiece(char);
          board[7 - i][col] = piece;
          col++;
        }
      }
    }

    return board;
  }

  private fenCharToPiece(char: string): Piece {
    const color = char === char.toUpperCase() ? PieceColor.White : PieceColor.Black;
    const type = this.fenCharToPieceType(char.toLowerCase());
    return { type, color };
  }

  private fenCharToPieceType(char: string): PieceType {
    switch (char) {
      case 'p': return PieceType.Pawn;
      case 'r': return PieceType.Rook;
      case 'n': return PieceType.Knight;
      case 'b': return PieceType.Bishop;
      case 'q': return PieceType.Queen;
      case 'k': return PieceType.King;
      default: throw new Error(`Invalid FEN character: ${char}`);
    }
  }

  getPiece(position: Position): Piece | null {
    const [row, col] = position;
    return this.board[row][col];
  }

  printBoard(): void {
    const symbols: { [key in PieceType]: string } = {
      [PieceType.Pawn]: '♙',
      [PieceType.Rook]: '♖',
      [PieceType.Knight]: '♘',
      [PieceType.Bishop]: '♗',
      [PieceType.Queen]: '♕',
      [PieceType.King]: '♔',
    };

    for (let i = 7; i >= 0; i--) {
      let row = '';
      for (let j = 0; j < 8; j++) {
        const piece = this.board[i][j];
        if (piece) {
          const symbol = symbols[piece.type];
          row += piece.color === PieceColor.White ? symbol : symbol.toLowerCase();
        } else {
          row += '·';
        }
        row += ' ';
      }
      console.log(row);
    }
  }

  getFEN(): string {
    let fen = '';
    for (let i = 7; i >= 0; i--) {
      let emptySquares = 0;
      for (let j = 0; j < 8; j++) {
        const piece = this.board[i][j];
        if (piece) {
          if (emptySquares > 0) {
            fen += emptySquares;
            emptySquares = 0;
          }
          fen += this.pieceToFenChar(piece);
        } else {
          emptySquares++;
        }
      }
      if (emptySquares > 0) {
        fen += emptySquares;
      }
      if (i > 0) {
        fen += '/';
      }
    }
    const turnChar = this.turn === 1 ? 'b' : 'w';
    return `${fen} ${turnChar} ${this.castlingRights} ${this.enPassantTarget} ${this.halfMoveClock} ${this.fullMoveNumber}`;
  }

  private pieceToFenChar(piece: Piece): string {
    const char = this.pieceTypeToFenChar(piece.type);
    return piece.color === PieceColor.White ? char.toUpperCase() : char.toLowerCase();
  }

  private pieceTypeToFenChar(type: PieceType): string {
    switch (type) {
      case PieceType.Pawn: return 'p';
      case PieceType.Rook: return 'r';
      case PieceType.Knight: return 'n';
      case PieceType.Bishop: return 'b';
      case PieceType.Queen: return 'q';
      case PieceType.King: return 'k';
    }
  }
}

export { Board };
