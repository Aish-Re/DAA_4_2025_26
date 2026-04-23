#include <iostream>
#include <vector>
#include <string>

using namespace std;

class NQueens {
private:
    int n;
    vector<vector<int>> board;
    int solutionCount;

    bool isSafe(int row, int col) {
        // Check column
        for (int i = 0; i < row; i++) {
            if (board[i][col] == 1) return false;
        }

        // Check upper left diagonal
        for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] == 1) return false;
        }

        // Check upper right diagonal
        for (int i = row, j = col; i >= 0 && j < n; i--, j++) {
            if (board[i][j] == 1) return false;
        }

        return true;
    }

    void printBoard() {
        cout << "Solution #" << ++solutionCount << ":" << endl;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == 1) cout << " Q ";
                else cout << " . ";
            }
            cout << endl;
        }
        cout << endl;
    }

    void solve(int row) {
        if (row == n) {
            printBoard();
            return;
        }

        for (int col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row][col] = 1;
                solve(row + 1);
                board[row][col] = 0; // Backtrack
            }
        }
    }

public:
    NQueens(int size) : n(size), solutionCount(0) {
        board.resize(n, vector<int>(n, 0));
    }

    void start() {
        cout << "Solving N-Queens for N = " << n << "..." << endl << endl;
        solve(0);
        if (solutionCount == 0) {
            cout << "No solutions found." << endl;
        } else {
            cout << "Total solutions: " << solutionCount << endl;
        }
    }
};

int main() {
    int n;
    cout << "Enter the number of queens (N): ";
    if (!(cin >> n) || n < 1) {
        cout << "Invalid input. Please enter a positive integer." << endl;
        return 1;
    }

    NQueens solver(n);
    solver.start();

    return 0;
}
