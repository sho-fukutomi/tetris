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
  next2: 0,
  next3: 0,
  next4: 0,
  next5: 0,
  next6: 0,
  next7: 0,

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
