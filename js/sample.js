/*********************************************
 ブロック形状
*********************************************/
const blocks = {
  0: [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ],
  1: [
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0]
  ],
  2: [
    [0, 0, 0, 0, 0],
    [0, 0, 2, 2, 0],
    [0, 0, 2, 2, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ],
  3: [
    [0, 0, 0, 0, 0],
    [0, 0, 3, 0, 0],
    [0, 3, 3, 3, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ],
  4: [
    [0, 0, 0, 0, 0],
    [0, 0, 4, 0, 0],
    [0, 0, 4, 0, 0],
    [0, 4, 4, 0, 0],
    [0, 0, 0, 0, 0]
  ],
  5: [
    [0, 0, 0, 0, 0],
    [0, 0, 5, 0, 0],
    [0, 0, 5, 0, 0],
    [0, 0, 5, 5, 0],
    [0, 0, 0, 0, 0]
  ],
  6: [
    [0, 0, 0, 0, 0],
    [0, 0, 6, 6, 0],
    [0, 6, 6, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ],
  7: [
    [0, 0, 0, 0, 0],
    [0, 7, 7, 0, 0],
    [0, 0, 7, 7, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ]
};

/*********************************************
 データオブジェクト
*********************************************/
let data = {
  board: {
    data: [],
    x: 10,
    y: 20
  },
  block: {
    type: 0,
    data: [],
    x: 0,
    y: 0,
  },
  next: 0,
  stock: {
    type: 0,
    stocked: false
  } ,
  started: false,
  gameover: false,
  intervalId: undefined,
  score: 0,
  level: 1,
  description: false
}
/*********************************************
 メソッドオブジェクト
*********************************************/
let methods = {
  /*
   * ゲーム開始
   */
  start() {
    this.clear();
    this.setNext();
    this.setBlock();
    this.started = true;
    this.startTimer();
  },
  /*
   * 終了処理
   */
  end() {
    this.started = false;
    this.gameover = true;
    this.stopTimer();
  },
  /*
   * タイマーセット
   */
  startTimer() {
    this.intervalId = setInterval(this.down, 1000 - (this.level - 1) * 100);
  },
  /*
   * タイマーオフ
   */
  stopTimer() {
    clearInterval(this.intervalId);
  },
  /*
   * タイマーリセット
   */
  resetTimer() {
    this.stopTimer();
    this.startTimer();
  },
  /*
   * ゲームクリアする
   */
  clear() {
    this.board.data = [...Array(this.board.y)].map(() => Array(this.board.x).fill(0));
    this.gameover = false;
    this.score = 0;
    this.level = 1;
    this.stock = {
      type: 0,
      stocked: false
    }
  },
  /*
   * ブロックを配備
   */
  setBlock() {
     //次のブロック設定
    this.setNext();
    //ブロック再配置
    this.initBlock();
  },
  /*
   * ブロック初期化
   */
  initBlock() {
    this.block.x = 2;
    this.block.y = this.block.type === 1 ? 0 : -1;
    this.block.data = JSON.parse(JSON.stringify(blocks[this.block.type]));
    while(this.isOverlap()) {
      this.block.y -= 1;
    }
  },
  /*
   * ブロックが重なっているか判定
   */
  isOverlap() {
    for (let h = 0; h < this.block.data.length; h++) {
      const y = this.block.y + h;
      if (y < 0) {
        continue;
      }
      for (let v = 0; v < this.block.data[h].length; v++) {
        const x = this.block.x + v;
        if (this.block.data[h][v] > 0 && this.board.data[y][x] > 0) {
          return true;
        }
      }
    }
    return false;
  },
  /*
   * 次のブロックを設定
   */
  setNext() {
    this.block.type = this.next;
    this.next = Math.floor(Math.random() * 7) + 1;
  },
  /*
   * ストックを設定
   */
  setStock() {
    if (this.stock.stocked) {
      return;
    }
    if (this.stock.type === 0) {
      this.stock.type = this.block.type;
      this.setBlock();
    } else {
      const tmp = this.stock.type;
      this.stock.type = this.block.type;
      this.block.type = tmp;
      this.initBlock();
      this.stock.stocked = true;
    }
    this.resetTimer();
  },
  /*
   * キー操作
   */
  handleKeydown(event) {
    //右移動
    if (event.keyCode === 39) {
      this.right();
    }
    //左移動
    else if (event.keyCode === 37) {
      this.left();
    }
    //最下移動
    else if (event.keyCode === 38) {
      this.downBottom();
    }
    //下移動
    else if (event.keyCode === 40) {
      this.down();
    }
    //ストック
    else if (event.keyCode === 16) {
      this.setStock();
    }
    //回転
    else if (event.keyCode === 32) {
      this.rotate();
    }
  },
  /*
   * 右移動
   */
  right() {
    if (!this.canMove(this.block.data, this.block.x + 1, this.block.y)) {
      return;
    }
    this.block.x += 1;
  },
  /*
   * 左移動
   */
  left() {
    if (!this.canMove(this.block.data, this.block.x - 1, this.block.y)) {
      return;
    }
    this.block.x -= 1;
  },
  /*
   * 回転
   */
  rotate() {
    //O型は回転しない
    if (this.block.type === 2) {
      return;
    }
    //回転後のブロック生成
    let block = JSON.parse(JSON.stringify(this.block.data))
    for (let h = 0; h < block.length; h++) {
      for (let v = 0; v < block[h].length; v++) {
        block[block.length - v - 1][h] = this.block.data[h][v];
      }
    }
    //回転可否
    if (!this.canMove(block, this.block.x, this.block.y)) {
      return;
    }
    this.block.data = block;
  },
  /*
   * 下移動
   */
  down() {
    if (this.canMove(this.block.data, this.block.x, this.block.y + 1)) {
      this.block.y += 1;
      this.resetTimer();
      return true;
    }
    //下までたどり着いたら盤面更新
    this.board.data = JSON.parse(JSON.stringify(this.display))
    //ゲームオーバー判定
    const g = this.block.type === 1 ? 0 : -1;
    if (this.block.y < g) {
      this.end();
      return;
    }
    //ブロック配置
    this.stock.stocked = false;
    this.setBlock();
    //ライン消し
    this.deleteLine();
    return false;
  },
  /*
   * 最下まで移動
   */
  downBottom() {
    while (this.down()) {
    }
  },
  /*
   * 移動可否判定
   */
  canMove(block, x, y) {
    for (let h = 0; h < block.length; h++) {
      for (let v = 0; v < block[h].length; v++) {
        //左端判定
        if (x + v < 0 && block[h][v] > 0) {
          return false;
        }
        //右端判定
        if (x + v > this.board.x - 1 && block[h][v] > 0) {
          return false;
        }
        //下端判定
        if (y + h > this.board.y - 1 && block[h][v] > 0) {
          return false;
        }
        //上端判定
        if (y + h < 0 && block[h][v] > 0) {
          return false;
        }
        //ボード外の座標は無視
        if (x + v < 0 || x + v > this.board.x - 1 || y + h > this.board.y - 1 || y + h < 0) {
          continue;
        }
        //ブロック判定
        if (this.board.data[y + h][x + v] > 0 && block[h][v] > 0) {
          return false;
        }
      }
    }
    return true;
  },
  /*
   * ラインの削除
   */
  deleteLine() {
    //ライン消し判定
    let lines = [];
    for (let h = 0; h < this.board.y; h++) {
      let c = 1;
      for (let v = 0; v < this.board.x; v++) {
        c *= this.board.data[h][v];
      }
      if (c > 0) {
        lines.push(h);
      }
    }
    //ライン消し
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      for (let v = 0; v < this.board.x; v++) {
        this.board.data[l][v] = 0;
      }
      for (let h = l; h > 1; h--) {
        this.board.data[h] = this.board.data[h - 1];
      }
    }
    this.setScore(lines.length);
  },
  /*
   * 点数設定
   */
  setScore(num) {
    this.score += 10 * num ** 3
  }
}
/*********************************************
 算出プロパティ
*********************************************/
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
  nextBlock() {
    return blocks[this.next]
  },
  /*
   * ストックブロック表示
   */
  stockBlock() {
    return blocks[this.stock.type]
  }
}


const app = new Vue({
  el: "#app",
  data: data,
  methods: methods,
  computed: computed,
  created() {
    this.clear();
  },
  mounted() {
     window.addEventListener("keydown", this.handleKeydown);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleKeydown);
  },
  filters: {
    blockClass(val) {
      switch(val) {
        case 1: return 'block-i';
        case 2: return 'block-o';
        case 3: return 'block-t';
        case 4: return 'block-j';
        case 5: return 'block-l';
        case 6: return 'block-s';
        case 7: return 'block-z';
        default: return '';
      }
    }
  },
  watch: {
    score(val) {
      if (this.level >= 10) {
        return;
      }
      if (val >= (this.level + 1) ** 3 * 100) {
        this.level += 1;
        this.resetTimer();
      }
    }
  }
})
