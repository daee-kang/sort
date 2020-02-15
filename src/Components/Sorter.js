import React, { Component } from "react";
import Bar from "./bar.js";
import "./Sorter.css";
import HeaderButton from "./headerbutton";
import Slider from './Slider';

export default class Sorter extends Component {
  componentDidMount(){
    this.generateArray(50);
    this.setState({
      selectedSort: this.bubbleSort,
      selectedMenu: 'bubble',
    })
  }

  phases = {
    START: 'start',
    SORTING: 'sorting',
    FINISHED: 'finished'
  }

  sorts = [
    "bubble",
    "selection",
    "insert",
    "quick",
    "radix"
  ];

  state = {
    selectedSort: undefined,
    selectedMenu: '',
    thisArray: [], 
    speed: 1,
    phase: this.phases.START
  };

  sleep = ms => {
    return new Promise(resolve => {
      if(ms <= 4){
        setImmediate(resolve, ms)
      } else {
        //settimeout only goes up to 4ms, otherwise use H@X 
        setTimeout(resolve, ms);
      }
    });
  };

  //--------------------------------------COLOR SETS//

  setColor = (i, color, notAsync = false) => {
    let a = this.state.thisArray;
    a[i].color = color;
    this.setState({
      thisArray: a
    });

    if(!notAsync)
      return this.sleep(this.state.speed).then(() => {});
  };

  setColorTwo = (i, j, color, notAsync = false) => {
    let a = this.state.thisArray;
    a[i].color = color;
    a[j].color = color;
    this.setState({
      thisArray: a
    });
    if(!notAsync)
      return this.sleep(this.state.speed).then(() => {});
  };

  setColorAll = color => {
    let a = this.state.thisArray;
    a.map(num => {
      return num.color = color;
    });
    this.setState({
      thisArray: a
    });
  };

  verifySort = async () => {
    let a = this.state.thisArray;
    for(let i = 0; i < a.length; i++){
      await this.setColor(i, 'green');
    }
    //TO-DO: set phase finished? add reset button maybs
    this.setPhase(this.phases.START);
  }

  //------------------------------------------SORTS//
  radixSort = async () => {

  }

  insertionSort = async () => {
    this.setPhase(this.phases.SORTING);

    let a = this.state.thisArray;

    for(let i = 1; i < a.length; i++){
      await this.setColorTwo(i, i - 1, 'blue');

      let k = i;
      while(k - 1 >= 0 && a[k].num < a[k-1].num){
        let temp = a[k - 1];
        a[k - 1] = a[k];
        a[k] = temp;
        k--;
        await this.setColorTwo(k, k + 1, 'red');
        this.setColorAll('black', true)
      }
      this.setColorAll('black', true)
    }

    this.setState({
      thisArray: a
    });

    this.verifySort();
  }

  quickSort = async () => {
    this.setPhase(this.phases.SORTING);

    //recursive quicksort
    const quickSort = async (a, start, end) => {
      if(start < end){
        let pivot = await partition(a, start, end);
        await quickSort(a, start, pivot - 1);
        await quickSort(a, pivot + 1, end);
      }
    }
    //ignore this cluster fuck of setting colors lmao
    const partition = async (a, start, end) => {
      let pivot = end;
      await this.setColor(pivot, 'yellow');
      let i = start - 1;
      let j = start;
      while(j < pivot){
        await this.setColor(j, 'blue');
        if(a[j].num > a[pivot].num){
          this.setColor(j, 'black', true);
          j++;
          await this.setColor(j, 'blue');
        } else {
          if(i >= 0) this.setColor(i, 'black');
          i++;
          await this.setColorTwo(i, j, 'red');
          let temp = a[j];
          a[j] = a[i];
          a[i] = temp;
          this.setColor(j, 'black');
          this.setColor(i, 'blue');
          j++;
          await this.setColor(j, 'blue');
        }
      }
      await this.setColorTwo(i + 1, pivot, 'red');
      let temp = a[i + 1];
      a[i + 1] = a[pivot];
      a[pivot] = temp;
      this.setColorAll('black');

      return i + 1;
    }

    //main runner function
    let a = this.state.thisArray;
    await quickSort(a, 0, a.length - 1);
    this.setState({
      thisArray: a
    });

    await this.verifySort();
  };

  selectionSort = async () => {
    this.setPhase(this.phases.SORTING);

    let a = this.state.thisArray;

    for (let i = 0; i < a.length - 1; i++) {
      let min = i;

      for (let j = i + 1; j < a.length; j++) {
        if (a[j].num < a[min].num) {
          a[min].color = "black";
          this.setState({
            thisArray: a
          });
          min = j;
          await this.setColor(min, "red");
        } else {
          await this.setColorTwo(min, j, "blue");
        }
        a[min].color = "black";
        a[j].color = "black";
        this.setState({
          thisArray: a
        });
      }

      let temp = a[i];
      a[i] = a[min];
      a[min] = temp;
    }

    this.setState({
      thisArray: a
    });

    this.verifySort();
  };

  bubbleSort = async () => {
    this.setPhase(this.phases.SORTING);

    let a = this.state.thisArray;

    let swapped = true;
    while (swapped) {
      swapped = false;
      for (let i = 0, j = 1; j < a.length; i++, j++) {
        if (a[j].num < a[i].num) {
          let temp = a[i];
          a[i] = a[j];
          a[j] = temp;
          await this.setColorTwo(i, j, "red");
          swapped = true;
        } else {
          await this.setColorTwo(i, j, "blue");
        }
        a[i].color = "black";
        a[j].color = "black";
        this.setState({
          thisArray: a
        });
      }
    }
    this.verifySort();
  };

  //-----------------------------------GENERAL TINGZ//

  generateArray = length => {
    let a = [];

    for (let i = 0; i < length; i++) {
      a.push({
        num: Math.floor(Math.random() * 100 + 1),
        color: "black"
      });
    }

    this.setState({
      thisArray: a
    });

    this.setPhase(this.phases.START);
  };

  setPhase = toPhase => {
    this.setState({
      phase: toPhase
    })
  }

  //----------------------------------EVENT HANDLERS//

  menuClickHandler = (e) => {
    let sort;
    // eslint-disable-next-line default-case
    switch(e.target.textContent){
      case 'bubble': {
        sort = this.bubbleSort; break;
      }
      case 'selection' : {
        sort = this.selectionSort; break;
      }
      case 'quick' : {
        sort = this.quickSort; break;
      }
      case 'insert' : {
        sort = this.insertionSort; break;
      }
      case 'radix' : {
        sort = this.radixSort; break;
      }
    }
    this.setState({
      selectedSort: sort,
      selectedMenu: e.target.textContent
    });
  }

  changeSpeedHandler = e => {
    this.setState({
      speed: e.target.value
    })
    console.log(e.target.value)
  };

  changeSizeHandler = e => {
    this.generateArray(e.target.value);
  }


  render() {
    return (
      <div className="sorter">
        <div>
          {this.sorts.map((sort, index) => {
            return <HeaderButton sort={sort} key={`sort${index}`} selected={this.state.selectedMenu === sort} onclick={(e) => this.menuClickHandler(e)}/>
          })}
        </div>

        <div>
          <button onClick={this.state.selectedSort} disabled={this.state.phase !== this.phases.START}>sort</button>
          <button onClick={() => this.generateArray(this.state.thisArray.length)} disabled={this.state.phase !== this.phases.START}>randomize</button>
        </div>

        <Slider label="size: " min="5" max="200" value={this.state.thisArray.length} handler={this.changeSizeHandler} disabled={this.state.phase !== this.phases.START}/>
        <Slider label="delay: " min="0" max="50" value={this.state.speed} handler={this.changeSpeedHandler}/>

        <div className="bar-container">
          {this.state.thisArray.map((num, index) => {
            return <Bar color={num.color} num={num.num} size={this.state.thisArray.length}key={`bar${index}`} />;
          })}
        </div>

        <div>
          <br/>
          made by daee kang :-) please i need a job
        </div>
      </div>
    );
  }
}
