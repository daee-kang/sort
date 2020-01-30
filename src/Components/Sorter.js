import React, { Component } from "react";
import Bar from "./bar.js";

export default class Sorter extends Component {
  state = {
    thisArray: [
      { num: 5, color: "black" },
      { num: 2, color: "black" },
      { num: 7, color: "black" },
      { num: 6, color: "black" },
      { num: 2, color: "black" },
      { num: 1, color: "black" }
    ]
  };

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  setColorTwo = (i, j, color) => {
    let a = this.state.thisArray;
    a[i].color = color;
    a[j].color = color;
    this.setState({
      thisArray: a
    });
    return this.sleep(2).then(() => {

    });
  };

  setColorAll = (color) => {
    let a = this.state.thisArray;
    a.map(num => {
        num.color = 'green'
    });
    this.setState({
        thisArray: a
    });
  }

  bubbleSort = async () => {
    let a = this.state.thisArray;

    let swapped = true;
    while (swapped) {
      swapped = false;
      for (let i = 0, j = 1; j < a.length; i++, j++) {
        await this.setColorTwo(i, j, "blue");
        if (a[j].num < a[i].num) {
          let temp = a[i];
          a[i] = a[j];
          a[j] = temp;
          await this.setColorTwo(i, j, "red");
          swapped = true;
        }
        a[i].color = 'black';
        a[j].color = 'black';
        this.setState({
            thisArray: a
        })
      }
    }
    this.setColorAll('green');
  };

  generateArray = (length) => {
      let a = [];

      for(let i = 0; i < 50; i++){
          a.push({
              num: Math.floor((Math.random() * 100) + 1),
              color: 'black'
          })
      }
      
      this.setState({
          thisArray: a
      })
  }

  render() {
    return (
      <div className="sorter">
        {this.state.thisArray.map((num, index) => {
          return <Bar color={num.color} num={num.num} />;
        })}
        <div>
          <button onClick={this.bubbleSort}>click me</button>
          <button onClick={this.generateArray}>generate</button>
        </div>
      </div>
    );
  }
}
