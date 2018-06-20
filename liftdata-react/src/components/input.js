import React, { Component } from 'react';

class InputForm extends Component {
    state = {
        exercise: '',
        weight: '',
        unit: 'lb',
        sets: 1,
        reps: 1
    }

    handleChange = ({ target }) => {
        let { value, name, type } = target;
        if (type === 'number' && value !== '') {
            value = parseFloat(value);
        }
        this.setState({
            [name]: value
        });
    }

    onSubmit = e => {
        e.preventDefault();

        // check for empty string weight 

        // send up
        this.props.onSubmit(this.state);

        this.setState({
            exercise: '',
            weight: '',
            sets: 1,
            reps: 1
        })
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Exercise</label>
                    <input
                        value={this.state.exercise}
                        onChange={this.handleChange}
                        name="exercise"
                        type="text"
                        className="form-control"
                        placeholder="Enter exercise name"
                    />
                    <small className="form-text text-muted">ex. squat, bench, or deadlift</small>
                </div>
                <div className="form-group">
                    <label>Weight</label>
                    <input
                        value={this.state.weight}
                        onChange={this.handleChange}
                        name="weight"
                        type="number"
                        min="0"
                        step="0.01"
                        className="form-control"
                        placeholder="Enter weight"
                    />
                </div>
                <div className="form-group">
                    <label>Unit</label>
                    <select
                        value={this.state.unit}
                        onChange={this.handleChange}
                        name="unit"
                        className="form-control"
                    >
                        <option value="lb">lb</option>
                        <option value="kg">kg</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Sets</label>
                    <input
                        value={this.state.sets}
                        onChange={this.handleChange}
                        name="sets"
                        type="number"
                        min="1"
                        step="1"
                        className="form-control"
                        placeholder="Enter sets"
                    />
                </div>
                <div className="form-group">
                    <label>Reps</label>
                    <input
                        value={this.state.reps}
                        onChange={this.handleChange}
                        name="reps"
                        type="number"
                        min="1"
                        step="1"
                        className="form-control"
                        placeholder="Enter reps"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        )
    }
}

export default InputForm;