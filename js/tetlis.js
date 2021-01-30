// var apptest = new Vue({
//    el: '#apptest',
//    data: {
//      message: 'Hello Vue!'
//    }
//  })
// let msec = 0;
//
// function count(){
//     if(msec >= 1000){
//       msec = 0;
//     }else {
//       msec ++;
//     }
//     apptest.message = msec;
//   }
//
// setInterval(count,16);




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
        case 1: return 'i';
        case 2: return 'o';
        case 3: return 't';
        case 4: return 'j';
        case 5: return 'l';
        case 6: return 's';
        case 7: return 'z';
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
