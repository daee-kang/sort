import React, { Component } from "react";
import Bar from "./bar.js";
import "./Sorter.css";
import HeaderButton from "./headerbutton.js";

export default class Sorter extends Component {
  speed = 1;

  state = {
    sorts: [
      "bubble",
      "selection"
    ],
    selectedSort: "bubble",
    thisArray: [
      { num: 5, color: "black" },
      { num: 2, color: "black" },
      { num: 7, color: "black" },
      { num: 6, color: "black" },
      { num: 2, color: "black" },
      { num: 1, color: "black" }
    ], 
  };

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  setColor = (i, color) => {
    let a = this.state.thisArray;
    a[i].color = color;
    this.setState({
      thisArray: a
    });

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
      num.color = "green";
    });
    this.setState({
      thisArray: a
    });
  };

  //SORTS//

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

    this.setColorAll("green");
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
    this.setColorAll("green");
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

  

  render() {
    return (
      <div className="sorter">
        <div>
          {this.state.sorts.map((sort, index) => {
            return <HeaderButton sort={sort} key={'sort' + index} selected={this.state.selectedSort === sort}/>
          })}
        </div>

        {this.state.thisArray.map((num, index) => {
          return <Bar color={num.color} num={num.num} />;
        })}
        <div>
          <button onClick={this.selectionSort}>Sort</button>
          <button onClick={this.generateArray}>generate</button>
        </div>
      </div>
    );
  }
}
