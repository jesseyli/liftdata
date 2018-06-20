import React, { Component } from 'react';
import Overview from './overview'

import { range, schemize, simplifyEntries } from './helpers/helper'

class Container extends Component {
    state = {
        entries: [
            {
                exercise: 'deadlift',
                weight: 300,
                unit: 'lb',
                sets: 3,
                reps: 3
            },
            {
                exercise: 'bench',
                weight: 200,
                unit: 'lb',
                sets: 5,
                reps: 5
            },
            {
                exercise: 'squat',
                weight: 300,
                unit: 'lb',
                sets: 3,
                reps: 5
            }
        ],
        compiled: [
        ]
        // add schema array here for optimizations later
    }

    componentDidMount() {
        // for demo purposes to force compile; build a rebalancing function 
        this.onSubmit({
            exercise: 'squat',
            weight: 300,
            unit: 'lb',
            sets: 3,
            reps: 5
        });
    }

    onSubmit = entry => {
        // update the compiled section here; can be optimized here so that schemize does not have to reschema all existing entries unless there is a change
        const { schemized, min_id, max_id } = schemize([...this.state.entries, entry], [], 0, 0);

        const compiled = simplifyEntries(schemized, range(min_id, max_id));

        this.setState({
            entries: schemized,
            compiled
        });
    }

    render() {
        return (
            <div>
                <Overview
                    onSubmit={this.onSubmit}
                    {...this.state}
                />
            </div>
        )
    }
}

export default Container;