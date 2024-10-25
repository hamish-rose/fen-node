import { Board } from '../board';

const defaultFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
describe('Board', () => {
  describe('constructor', () => {
    it('should initialize a default board correctly', () => {
      const board = new Board();
      expect(board.getFEN()).toBe(defaultFEN);
    });

    it('should initialize a board from a valid FEN string', () => {
      const fen = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2';
      const board = new Board(fen);
      expect(board.getFEN()).toBe(fen);
    });
  });

  describe('getPiece', () => {
    it('should return the correct piece for a given position', () => {
      const board = new Board();
      const whitePawn = board.getPiece([1, 0]);
      expect(whitePawn).toEqual({ type: 0, color: 0 }); // Pawn: 0, White: 0

      const blackKing = board.getPiece([7, 4]);
      expect(blackKing).toEqual({ type: 5, color: 1 }); // King: 5, Black: 1
    });

    it('should return null for an empty square', () => {
      const board = new Board();
      const emptySquare = board.getPiece([3, 3]);
      expect(emptySquare).toBeNull();
    });
  });

  describe('getFEN', () => {
    it('should return the correct FEN string for the initial board state', () => {
      const board = new Board();
      expect(board.getFEN()).toBe(defaultFEN);
    });

    it('should return the correct FEN string for a custom board state', () => {
      const fen = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2';
      const board = new Board(fen);
      expect(board.getFEN()).toBe(fen);
    });
  });

  describe('getFEN with complicated cases', () => {
    it('should return the correct FEN string for a board with multiple pieces moved', () => {
      const fen = 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e3 0 2';
      const board = new Board(fen);
      expect(board.getFEN()).toBe(fen);
    });

    it('should return the correct FEN string for a board with castling rights changed', () => {
      const fen = 'r3k2r/pppq1ppp/2n1bn2/3p4/3P4/2N1BN2/PPPQ1PPP/R3K2R w KQkq - 0 10';
      const board = new Board(fen);
      expect(board.getFEN()).toBe(fen);
    });

    it('should return the correct FEN string for a board with en passant target', () => {
      const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq e3 0 1';
      const board = new Board(fen);
      expect(board.getFEN()).toBe(fen);
    });

    it('should return the correct FEN string for a board with halfmove and fullmove counters', () => {
      const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 15 30';
      const board = new Board(fen);
      expect(board.getFEN()).toBe(fen);
    });
  });
});
