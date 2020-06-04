import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import Note from './Note.jsx';
import Draggable from 'react-draggable';
import { useSpring, animated } from 'react-spring'
import { useDrag } from 'react-use-gesture'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// http://reactcommunity.org/react-modal/accessibility/
ReactModal.setAppElement('#root');

class Noteboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gotNotes: false,
      notes: [],
      showModal: false,
    }
    // this.clickHandler = this.clickHandler.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  
  handleOpenModal (e) {
    if(e.type === "mouseup") {console.log("in mouseup"); this.setState({ showModal: true });}
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
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
      
    const noteComps = notes.map((note, i) => {
      return ( 
        <div>
          <button onClick={this.handleOpenModal}>
            <Draggable className="draggable">
              <div>
                <Note key={i} note={note}/> 
              </div>
            </Draggable>
          </button>
          <ReactModal isOpen={this.state.showModal} contentLabel="Test Label">
            <button onClick={this.handleCloseModal}>Close Modal</button>
          </ReactModal>
        </div>
      );
    });

    // clickHandler={ () => this.clickHandler() } 
    
    return (
      <section className="mainSection">
        <div className="noteContainer">
          { noteComps }
        </div>
      </section>
    );
  }
}

export default Noteboard;