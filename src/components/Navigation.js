import React, { Component } from 'react';

class Navigation extends Component {
    constructor(props){
        super(props)
        this.state = {
            list: [],
            addlist:[],
            bar: "PROD"
        }
    }
    componentDidMount() {
        fetch ("https://5d8e0901370f02001405c7c9.mockapi.io/api/v1/postblog/item")
        .then (response => response.json())
        .then (data => {
            console.log(data);
            this.setState({list: data})
        })
    }
    //-------------------------------------------------------------
    Product = () => {
        
        const { list } = this.state;
        
        return (<div>
            {
            list.map((elem)=>(<div className={"ElemP"}>
            <h4 className= "item">{elem.name}</h4>
            <p className= "item">{elem.price}$</p>
            <button className="add" onClick = {()=>this.Add(elem)}>Add</button>
            </div>))
            }
            </div>
        )
    }
    onProduct = () =>{
    this.setState({bar: "PROD"});
    }
    //--------------------------------------------------------------
    Card = () =>{ 
        const { addlist } = this.state;
        
        return (<div>
            {
            addlist.map((elem)=>(<div className="ElemC">
            <span className= "item">{elem.name+ "  "}{elem.price}$</span>
            <button className="remove" onClick = {()=>this.Remove(elem)}> Remove</button>
            </div>))
            }
            </div>
        )
    }
    onCard = () =>{
    this.setState({bar: "CARD"});
    }
    //--------------------------------------------------------------
    Add = (elem) =>{
        let expr = true;
        this.state.addlist.map((e)=>{
            if(e.id === elem.id){
            console.log("Allready exist!");
            expr = false;
            }
        })
        if(expr){
        this.state.addlist.push(elem);
        console.log(this.state.addlist);
        this.setState({bar: "PROD"});
        }
    }
    Remove = (elem)=>{
        this.state.addlist.map((e, ind)=>{
            if(elem === e)
            this.state.addlist.splice(ind,1);
        })
        console.log(this.state.addlist);
        this.setState({bar: "CARD"});
    }

    render() { 
        return (
            <div id = "Nav">
                <div id= "Bar">
            <button id="Prod" onClick = {this.onProduct}>Product</button>
            <button id = "Card" onClick = {this.onCard}>Card</button> 
            <button className = "Sel">Selected{" " + this.state.addlist.length}</button>
                </div>
            {this.state.bar === "PROD" ? <this.Product/>: <this.Card/>}
            </div>
            );
    }
}
 
export default Navigation;