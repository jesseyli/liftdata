import React, { Component } from 'react';
import InputForm from './input';
import Table from './table';

class Overview extends Component {
    state = {
        regular: true
    }

    render() {
        const { entries, compiled, onSubmit } = this.props;
        return (
            <div>
                <button className="btn btn-danger" onClick={() => { this.setState({ regular: !this.state.regular }) }}>Toggle</button>
                <Table
                    logs={this.state.regular ? entries : compiled}
                    headers={['Exercise', 'Weight', 'Sets', 'Reps']}
                />


                <InputForm onSubmit={onSubmit} />
            </div>
        )
    }
}

export default Overview;