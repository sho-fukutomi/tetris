/*********************************************
 メソッドオブジェクト
*********************************************/
let methods = {
  /*
   * ゲーム開始
   */
  start() {
    this.clear();
    this.setNext2();
    this.setBlock();
    this.started = true;
    this.startTimer();
    // this.intervalscore = setInterval(this.checkscore, 50);
    // this.make1Set();
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
    this.intervalscore = setInterval(this.checkscore, 50);
  },
  /*
   * タイマーオフ
   */
  stopTimer() {
    clearInterval(this.intervalId);
    clearInterval(this.intervalscore);
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
    this.actscore = 0;
    this.score = 0;
    this.level = 1;
    this.stock = {
      type: 0,
      stocked: false
    }
    this.minoset = this.makeminoset();
    this.block.data = JSON.parse(JSON.stringify(blocks[this.block.type]));
  },
  /*
   * ブロックを配備
   */
  setBlock() {
     //次のブロック設定
    this.setNext2();
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
    // this.next = Math.floor(Math.random() * 7) + 1;
    if(this.minoset.length ){
    }else {
      this.make1Set();
    }
    this.next = this.minoset[0];

    this.minoset.shift();
  },
  make1Set(){
    var addflg = true;
    var tmpmino = 0;
    // var tmpset = [];
    this.minoset.push(Math.floor(Math.random() * 7) + 1); // とりあえず最初いれる
     console.log(this.minoset);
    for (var i = 1; i < 7; i++) {
      tmpmino = Math.floor(Math.random() * 7) + 1;  // とりあえず候補作る
      this.minoset.forEach((item, j) => {　//候補検証
        if(this.minoset[j] == tmpmino){
          addflg = false;
        }
      });
      if (addflg) {
        this.minoset.push(tmpmino);
      }else {
        // console.log(i);
        i--;
      }
      addflg = true;
      // array[i] = Math.floor(Math.random() * 7) + 1;
    }
    // console.log(minoset);
  },

  setNext2(){
    this.block.type = this.next;
    console.log('start setNext2');
    console.log(this.minoset.length);
    // if (this.minoset.length == 0) {
    //   this.minoset = this.makeminoset();
    // }
    if(this.minoset.length < 14){
        if (this.minoset.length < 7) {
          //配列作る、pushする
          this.minoset.concat(this.makeminoset());

        }
        this.minoset = this.minoset.concat(this.makeminoset());
      }
    this.next = this.minoset[0];
    this.next2 = this.minoset[1];
    this.next3 = this.minoset[2];
    this.next4 = this.minoset[3];
    this.next5 = this.minoset[4];
    this.next6 = this.minoset[5];
    this.next7 = this.minoset[6];
    this.next8 = this.minoset[7];
    this.next9 = this.minoset[8];
    this.next10 = this.minoset[9];
    this.next11 = this.minoset[10];
    this.next12 = this.minoset[11];
    this.next13 = this.minoset[12];


    this.minoset.shift();
  },
  makeminoset(){
    var addflg = true;
    var tmpmino = 0;
    var tmpminoset = [];

    tmpminoset.push(Math.floor(Math.random() * 7) + 1);
    for (var i = 1; i < 7; i++) {
      tmpmino = Math.floor(Math.random() * 7) + 1;  // とりあえず候補作る
      tmpminoset.forEach((item, j) => {　//候補検証
        if(tmpminoset[j] == tmpmino){
          addflg = false;
        }
      });
      if (addflg) {
        tmpminoset.push(tmpmino);
      }else {
        // console.log(i);
        i--;
      }
      addflg = true;
    }
    return tmpminoset;

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
   * ゲーム画面サイズ調整
   */
  handleResize(event) {
    const left=[0,"header","bottom","footer"].reduce((left,el)=>left+document.getElementById(el).offsetHeight);
    const h=window.innerHeight - left;
    const contentHeight=document.getElementById("contents").offsetHeight;
    const ratio = h / contentHeight;
    if(ratio > 1) ratio=1.0
    const top = (contentHeight - h) / -2  - 20;
     this.mainStyle={
      height: `${h}px`,
     };
     this.innerStyle={
       transform: `scale(${ratio})`,
       top: `${top}px`
     };
  },
  /*
   * キー操作
   */
  handleKeydown(event) {
    //右移動
    if (event.keyCode === 39) {
      if (this.started) {
          this.right();
      }
      this.button_right = true;
      setTimeout( () => {this.button_right = false}, 300,this);
    }
    //左移動
    else if (event.keyCode === 37) {
      if (this.started) {
        this.left();
      }
      this.button_left = true;
      setTimeout( () => {this.button_left = false}, 300,this);
    }
    //最下移動
    else if (event.keyCode === 38) {
      if (this.started) {
        this.downBottom();
      }
      this.button_up = true;
      setTimeout( () => {this.button_up = false}, 300,this);
    }
    //下移動
    else if (event.keyCode === 40) {
      if (this.started) {
        this.down();
      }
      this.button_down = true;
      setTimeout( () => {this.button_down = false}, 300,this);
    }
    //ストック
    else if (event.keyCode === 67) {
      if (this.started) {
        this.setStock();
      }
      this.button_stock = true;
      setTimeout( () => {this.button_stock = false}, 300,this);
    }
    //左回転
    else if (event.keyCode === 90) {
      if (this.started) {
        this.rotatel();
      }
      this.button_rotatel = true;
      setTimeout( () => {this.button_rotatel = false}, 300,this);
    }
    //右回転
    else if (event.keyCode === 88) {
      if (this.started) {
        this.rotater();
      }
      this.button_rotater = true;
      setTimeout( () => {this.button_rotater = false}, 300,this);
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
    this.checkghost();
  },
  /*
   * 左移動
   */
  left() {
    if (!this.canMove(this.block.data, this.block.x - 1, this.block.y)) {
      return;
    }
    this.block.x -= 1;
    this.checkghost();
  },
  /*
   * 回転
   */
  rotatel() {
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
    this.checkghost();
  },
  rotater() {
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
    this.checkghost();
  },
  checkghost(){

    console.log(this.block.x);
    console.log(this.block.data);


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
    this.actscore += 10 * num ** 3
  },

  // setInterval 用 点数インクリメント関数
  checkscore(){
    if(this.actscore > 0){
      if(this.actscore >this.score ){
        this.score++;
        if(this.score % 10 == 9 ){
          document.querySelector(".score-num").style.fontSize = `8vh`;


        }else {
          document.querySelector(".score-num").style.fontSize = `5vh`;
        }
      }
    }

  },

}
