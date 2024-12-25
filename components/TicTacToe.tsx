/**
 * steps followed to complete this app
 **************************************
 *
 * 1. Set up the project structure - done
 * 2. Create the main TicTacToe component
 *    a. Define the game board - done
 *    b. Implement the game logic - done
 * 3. Add player interaction
 *    a. Handle player moves - done
 *    b. Check for win conditions - done
 * 4. Style the game board - done
 * 5. Add reset functionality - done
 * 6. Test the application - done
 *
 * Inspirations:
 * tic-tac-toe game logic: https://medium.com/@canankorkut1/how-to-create-a-tic-tac-toe-with-html-css-and-javascript-10a25fddd356
 *
 */
import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

// getting the width of the window
const windowWidth = Dimensions.get("window").width;

const TicTacToe: React.FC = () => {
  // board state to keep track of the current state of the game
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  // currentPlayer state to keep track of the current player
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  // winner state to keep track of the winner
  const [winner, setWinner] = useState<string | null>(null);

  // winning combinations matrix
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  useEffect(() => {
    checkWinner();
  }, [board]);

  // function to check if there is a winner
  const checkWinner = () => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
    if (board.every((cell) => cell !== "")) {
      setWinner("Draw");
    }
  };

  // function to handle cell press
  const handlePress = (index: number) => {
    if (board[index] === "" && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  // function to render each cell
  const renderCell = (index: number) => (
    <TouchableOpacity
      style={styles.cell}
      onPress={() => handlePress(index)}
      disabled={!!winner}
    >
      <Text style={styles.cellText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  // function to reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {[0, 1, 2].map((row) => (
          <View key={row} style={styles.row}>
            {[0, 1, 2].map((col) => renderCell(row * 3 + col))}
          </View>
        ))}
      </View>
      {winner && (
        <View style={styles.winnerContainer}>
          <Text style={styles.winnerText}>
            {winner === "Draw" ? "It's a draw!" : `Player ${winner} wins!`}
          </Text>
          <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
            <Text style={styles.resetButtonText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      )}
      {!winner && (
        <Text style={styles.currentPlayerText}>
          Current Player: {currentPlayer}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  board: {
    width: windowWidth * 0.9,
    aspectRatio: 1,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#484747",
  },
  cellText: {
    fontSize: 40,
  },
  winnerContainer: {
    alignItems: "center",
  },
  winnerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  currentPlayerText: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default TicTacToe;
