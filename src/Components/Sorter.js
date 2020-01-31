import React, { Component } from "react";
import Bar from "./bar.js";
import './Sorter.css';


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

  setColor = (i, color) => {
      let a = this.state.thisArray;
      a[i].color = color;
      this.setState({
          thisArray: a
      });

      return this.sleep(2).then(() => {

      });
  }

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

  selectionSort = async () => {
    let a = this.state.thisArray;

    for(let i = 0; i < a.length - 1; i++){
        let min = i;
        
        for(let j = i + 1; j < a.length; j++){
            await this.setColorTwo(min, j, 'blue');

            if(a[j].num < a[min].num){
                a[min].color = 'black';
                this.setState({
                    thisArray: a
                });
                min = j;
                await this.setColor(min, 'red');
            }
            a[min].color = 'black';
            a[j].color = 'black';
            this.setState({
                thisArray: a
            })
        }

        let temp = a[i];
        a[i] = a[min];
        a[min] = temp;
    }

    this.setState({
        thisArray: a
    })

    this.setColorAll('green');
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
          <button onClick={this.selectionSort}>selection</button>
          <button onClick={this.bubbleSort}>bubble</button>
          <button onClick={this.generateArray}>generate</button>
        </div>
      </div>
    );
  }
}
