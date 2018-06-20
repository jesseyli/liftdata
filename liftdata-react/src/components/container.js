import React, { Component } from 'react';
import InputForm from './input';

class Container extends Component {
    state = {
        entries: []
    }

    onSubmit = entry => {
        this.setState(prevState => ({
            entries: [...prevState.entries, entry]
        }));
    }

    render() {
        return (
            <div>

                {
                    this.state.entries.map(({ exercise, weight, unit, sets, reps }, index) => (
                        <ul key={index}>
                            <li>{exercise}</li>
                            <li>{`${weight} ${unit}`}</li>
                            <li>{sets}</li>
                            <li>{reps}</li>
                        </ul>)
                    )
                }

                <InputForm onSubmit={this.onSubmit} />
            </div>
        )
    }
}

export default Container;