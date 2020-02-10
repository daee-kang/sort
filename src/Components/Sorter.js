import React, { Component } from "react";
import Bar from "./bar.js";
import "./Sorter.css";
import HeaderButton from "./headerbutton.js";

export default class Sorter extends Component {
  componentDidMount(){
    this.generateArray();
    this.setState({
      selectedSort: this.bubbleSort,
      selectedMenu: 'bubble',
    })
  }

  speed = 1;

  sorts = [
    "bubble",
    "selection",
    "quick",
    "insert"
  ];

  state = {
    selectedSort: undefined,
    selectedMenu: '',
    thisArray: [], 
  };

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  //COLOR SETS//

  setColor = (i, color, notAsync) => {
    let a = this.state.thisArray;
    a[i].color = color;
    this.setState({
      thisArray: a
    });

    if(!notAsync)
      return this.sleep(this.speed).then(() => {});
  };

  setColorTwo = (i, j, color) => {
    let a = this.state.thisArray;
    a[i].color = color;
    a[j].color = color;
    this.setState({
      thisArray: a
    });
    return this.sleep(this.speed).then(() => {});
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
  }

  //SORTS//
  insertionSort = async () => {
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
  };

  selectionSort = async () => {
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

  generateArray = length => {
    let a = [];

    for (let i = 0; i < 50; i++) {
      a.push({
        num: Math.floor(Math.random() * 100 + 1),
        color: "black"
      });
    }

    this.setState({
      thisArray: a
    });
  };

  //TO-DO
  changeSpeed = event => {
    this.speed = event.target.value;
  };

  //EVENT HANDLERS//

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
    }
    this.setState({
      selectedSort: sort,
      selectedMenu: e.target.textContent
    });
  }

  render() {
    return (
      <div className="sorter">
        <div>
          {this.sorts.map((sort, index) => {
            return <HeaderButton sort={sort} key={`sort${index}`} selected={this.state.selectedMenu === sort} onclick={(e) => this.menuClickHandler(e)}/>
          })}
        </div>

        {this.state.thisArray.map((num, index) => {
          return <Bar color={num.color} num={num.num} key={`bar${index}`} />;
        })}

        <div>
          <button onClick={this.state.selectedSort}>sort</button>
          <button onClick={this.generateArray}>generate</button>
        </div>
        {/*TO-DO: SLIDER
        <div className="slidecontainer">
          <input type="range" min="1" max="100" value="50" className="slider" id="myRange"/>
        </div>
        */}

      </div>
    );
  }
}
