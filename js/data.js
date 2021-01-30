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
