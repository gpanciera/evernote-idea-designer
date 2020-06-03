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
      return ( <Note key={i} note={note} clickHandler={ () => this.clickHandler() }  /> );
    });
    console.log("Noteboard -> render -> noteComps", noteComps)

    return (
      <section className="mainSection">
        {/* <header className="pageHeader">
          <h2>Notes</h2>
        </header> */}
        <div className="noteContainer">
          { noteComps }
        </div>
      </section>
    );
  }
}

export default Noteboard;