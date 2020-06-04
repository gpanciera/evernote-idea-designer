import React, { Component } from 'react';
import Note from './Note.jsx';

class Noteboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gotNotes: false,
      notes: [],
    }
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    fetch('/api/')
      .then( res => res.json())
      .then( notes => {
        if (!Array.isArray(notes)) notes = [];

        return this.setState({
          notes,
          gotNotes: true
        });
      })
      .catch(err => console.log('Noteboard.componentDidMount-error fetching notes: ', err));
    }
  
  clickHandler() {
    console.log("WE'RE IN THE HANDLER!");
  }

  render() {
    if (!this.state.gotNotes) return (
        <div>
        <h1>Loading data, please wait...</h1>
      </div>
    );
    
    const { notes } = this.state;
    
    if (!notes) return null;
    
    if (!notes.length) return (
      <div>Sorry, no notes found</div>
      );
      
    console.log("Noteboard -> notes ****", notes);
    const noteComps = notes.map((note, i) => {
      console.log("Noteboard -> render -> note", note);
      console.log("Noteboard -> render -> note.type", note.type);
      console.log("Noteboard -> render -> note.note", note.note);
      let thing = note.note;
      return ( <Note key={i} note={thing} clickHandler={ () => this.clickHandler() }  /> );
    });
    console.log("Noteboard -> render -> noteComps", noteComps)

    let dickNuts = {"note": {"_text": "This is a test note bro"}};
    // let dickNuts2 = 'Hello dickNuts2'
    
    return (
      <section className="mainSection">
        <div>{dickNuts}</div>
        {/* <div className="noteContainer">
          { noteComps }
        </div> */}
      </section>
    );
  }
}

export default Noteboard;