import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class Fret extends Component{

	render(){
		return(
			<div className = "fret" onClick={() => this.props.onClick()}>
					{ this.props.value }
			</div>
		)
	}
}

class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			frets: Array(6).fill(''),
		};
	}
	addNote(i){
		const frets = this.state.frets.slice();
		if(frets[i] === ''){
			frets[i] = 'X';
		}else{
			frets[i] = '';
		}
		this.setState({frets: frets})
	}
	renderFret(i){
		return (
			<Fret
			value={this.state.frets[i]}
			onClick={() => this.addNote(i)}
			/>
		);
	}
	render() {
	return (
	<div className="App">
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<h1 className="App-title">Welcome to Strum</h1>
		</header>
		<div className = "guitar">
			<div className = "graphics">
				<div className = "fret-graphic">
				</div>
				<div className = "fret-graphic">
				</div>
				<div className = "fret-graphic">
				</div>
				<div className = "fret-graphic">
				</div>
				<div className = "fret-graphic">
				</div>
				<div className = "fret-graphic">
				</div>
				<div className = "str-graphic">
				</div>
				<div className = "str-graphic">
				</div>
				<div className = "str-graphic">
				</div>
				<div className = "str-graphic">
				</div>
				<div className = "str-graphic">
				</div>
				<div className = "str-graphic">
				</div>
			</div>
			<div className = "boxes">
				<div className = "string">
					{this.renderFret(0)}
					<div className = "fret">
						{ this.state[0] }
					</div>
					<div className = "fret">
						{ this.state[0] }
					</div>
					<div className = "fret">
						{ this.state[0] }
					</div>
					<div className = "fret">
						{ this.state[0] }
					</div>
					<div className = "fret">
						{ this.state[0] }
					</div>
				</div>
				<div className = "string">
					<div className = "fret">
					</div>
					<div className = "fret">
					</div>
					<div className = "fret">
					</div>
					<div className = "fret">
					</div>
					<div className = "fret">
					</div>
					<div className = "fret">
					</div>
				</div>
				<div className = "string">
					<div className = "fret">
					</div>
					<div className = "fret">
					</div>
					<div className = "fret">
					</div>
					<div className = "fret">
					</div>
					<div className = "fret">
					</div>
					<div className = "fret">
					</div>
				</div>
				<div className = "string">
					<div className = "fret">
					</div>
					<div className = "fret">
					</div>
					<div className = "fret">
					</div>
					<div className = "fret">
					</div>
					<div className = "fret">
					</div>
					<div className = "fret">
					</div>
				</div>
				<div className = "string">
					<div className = "fret">
					</div>
					<div className = "fret">
					</div>
					<div className = "fret">
					</div>
					<div className = "fret">
					</div>
					<div className = "fret">
					</div>
					<div className = "fret">
					</div>
				</div>
				<div className = "string">
					<div className = "fret">
					</div>
					<div className = "fret">
					</div>
					<div className = "fret">
					</div>
					<div className = "fret">
					</div>
					<div className = "fret">
					</div>
					<div className = "fret">
					</div>
				</div>
			</div>
		</div>
	</div>
);
}
}

export default App;
