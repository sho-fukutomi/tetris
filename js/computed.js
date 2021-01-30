let computed = {
  /*
   * 画面に表示するボード
   */
  display() {
    //ボードのコピー
    let board = JSON.parse(JSON.stringify(this.board.data))
    if (this.block.data.length === 0) {
      return board;
    }
    //ブロックの描画
    for (let h = 0; h < this.block.data.length; h++) {
      for (let v = 0; v < this.block.data[h].length; v++) {
        const y = this.block.y + h;
        const x = this.block.x + v;
        if (y < 0 || x < 0 || y > this.board.y - 1 || x > this.board.x - 1) {
          continue;
        }
        if (this.block.data[h][v] === 0) {
          continue;
        }
        board[h + this.block.y][v + this.block.x] = this.block.data[h][v];
      }
    }
    return board;
  },
  /*
   * 次のブロック表示
   */
  nextBlock1() {
    return blocks[this.next]
  },
  nextBlock2() {
    return blocks[this.next2]
  },
  nextBlock3() {
    return blocks[this.next3]
  },
  nextBlock4() {
    return blocks[this.next4]
  },
  nextBlock5() {
    return blocks[this.next5]
  },
  nextBlock6() {
    return blocks[this.next6]
  },
  /*
   * ストックブロック表示
   */
  stockBlock() {
    return blocks[this.stock.type]
  }
}
