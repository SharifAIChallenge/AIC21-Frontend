<template>
  <div id="staff-header">
    <!-- <div class="ourTeam">
      <h1>تیم ما</h1>
      <p>فلان</p>
    </div> -->
    <div class="staffHeader d-flex justify-center align-center flex-column">
      <h1><img :src="title" alt="aichallenge" /></h1>
      <p>با تیم برگزارکننده AI Challenge 2021 بیشتر آشنا شو</p>
      <v-row v-for="(row, index) in rows" :key="index" :id="'headerRow-' + index">
        <div v-for="(col, i) in cols" :key="i" class="headerDiv">
          <img class="staff_img" src="https://www.aichallenge.ir" />
          <!-- {{ cols * index + i }} -->
        </div>
      </v-row>
    </div>
  </div>
</template>

<script>
import title from '~/assets/images/out-team.svg';
export default {
  props: { staffs: Array },
  data() {
    return {
      cols: 20,
      rows: 6,
      randomStaffs: [],
      width: 0,
      height: 0,
      randomImage: [],
      index: 11,
      title: title,
    };
  },
  methods: {
    generateRandomIndexForGrid() {
      for (let index = 0; index < this.index; index++) {
        let randomRow = Math.floor(Math.random() * this.rows);
        let randomCol = Math.floor(Math.random() * this.cols) + 1;
        document
          .querySelector('#headerRow-' + randomRow + ' .headerDiv:nth-of-type(' + randomCol + ') img')
          .setAttribute('src', this.randomImage[index]);
        document.querySelector('#headerRow-' + randomRow + ' .headerDiv:nth-of-type(' + randomCol + ') img').classList.add('active');
      }
    },
    resetSrc() {
      for (let row = 0; row < this.rows; row++) {
        for (let col = 1; col <= this.cols; col++) {
          document.querySelector('#headerRow-' + row + ' .headerDiv:nth-of-type(' + col + ') img').removeAttribute('src');
          document.querySelector('#headerRow-' + row + ' .headerDiv:nth-of-type(' + col + ') img').classList.remove('active');
        }
      }
    },
    sendRandomStaff() {
      if (this.randomStaffs.length >= this.index) return;
      let staff = Math.floor(Math.random() * this.staffs.length);
      if (this.randomStaffs.indexOf(staff) < 0) {
        this.randomStaffs.push(staff);
        this.randomImage.push(this.staffs[staff].image);
      }
      this.sendRandomStaff();
    },
    preparePictures() {
      this.randomStaffs = [];
      this.randomImage = [];
      this.resetSrc();
      this.sendRandomStaff();
      this.generateRandomIndexForGrid();
    },

    reSize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.calcColAndRow();
      this.preparePictures();
    },

    calcColAndRow() {
      if (959 < this.width) {
        this.rows = 4;
        this.index = 11;
      } else if (599 < this.width && this.width < 960) {
        this.rows = 5;
        this.index = 9;
      } else {
        this.rows = 6;
        this.index = 7;
      }

      this.cols = Math.floor(this.width / (this.height / this.rows)) + 1;
      document.getElementsByClassName('staffHeader')[0].style.width = this.cols * (100 / this.rows) + 'vh';
      document.getElementsByClassName('staffHeader')[0].style.transform =
        'translateX(' + ((this.cols / this.rows) * this.height - this.width) / 2 + 'px)';
      for (let index = 0; index < this.rows; index++) {
        document.getElementById('headerRow-' + index).style.height = 100 / this.rows + 'vh';
      }
    },
  },
  mounted() {
    this.reSize();
    this.preparePictures();
    window.addEventListener('resize', this.reSize);
    setInterval(this.preparePictures, 10000);
  },
};
</script>

<style lang="scss" scoped>
@import 'assets/mixins.scss';

#staff-header {
  width: 100%;
  overflow: hidden;
  .staffHeader {
    height: 100vh;
    .row {
      width: 100%;
      flex-wrap: nowrap;
    }
    .headerDiv {
      width: 50%;
      .staff_img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0;
        visibility: hidden;
        filter: grayscale(1);
      }
      .active {
        visibility: visible;
        opacity: 1;
        transition: 2s;
      }
    }
    h1 {
      position: absolute;
      font-size: 5rem;
      z-index: 1;
      img {
        width: 20vw;
        @include v-not-md {
          width: 30vw;
        }
        @include v-not-sm {
          width: 50vw;
        }
      }
    }
    p {
      position: absolute;
      z-index: 1;
      margin-top: 25vh;
    }
    // .ourTeam {
    //   display: flex;
    //   align-items: center;
    //   flex-direction: column;
    //   justify-content: center;
    //   h1 {
    //     font-size: 5rem;
    //   }
    // }
    .image-wrapper {
      background: black;
      width: 25vw;
      height: 33.3vh;
    }
  }
}
</style>
