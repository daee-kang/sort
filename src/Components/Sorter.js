import React, { Component } from 'react';
import Node from './node.js';

export default class Sorter extends Component {
    state = {
        thisArray: [6, 2, 3, 8, 1, 3],
        markedIndex: [],
        switchIndex: false
    }   

    bubbleSort = () => {
        let a = this.state.thisArray;

        for(let i = 0; i < a.length; i++){
            for(let k = i + 1; k < a.length; k++){
                setTimeout(() => {
                    this.setState({
                        markedIndex: [i, k]
                    });
                    
                    if(a[i] > a[k]){
                        let temp = a[i];
                        a[i] = a[k];
                        a[k] = temp;
                        this.setState({
                            thisArray: a,
                            switchIndex: true
                        });
                    }
                }, 1000);

                this.setState({
                    switchIndex: false
                });
            }
        }

    }
    
    render() {
        return (
            <div className = 'sorter'>
                {this.state.thisArray.map((num, index) => {
                    let color = 'black';
                    if(this.state.markedIndex.includes(index))
                        color = 'blue';
                    return <Node color={color} num={num}/>
                })}
                <button onClick={this.bubbleSort}>click me</button>
            </div>
        )
    }
}

