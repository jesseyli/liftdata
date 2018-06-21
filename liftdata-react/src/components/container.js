import React, { Component } from 'react';
import Overview from './overview'

import { range, schemize, simplifyEntries, newEntry } from './helpers/helper'

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
        compiled: [],
        // add schema array here for optimizations later
        schema_ids: {
            min_id: 0,
            max_id: 0
        }
    }

    componentDidMount() {
        // initialize data with organized schemas; if entries had time stamps, i can organize them correctly after they have been schemized
        // currently they are sorted by their schema after being schemized

        const { schemized, min_id, max_id } = schemize(this.state.entries, [], 0, 0);
        const compiled = simplifyEntries(schemized, range(min_id, max_id));

        this.setState({
            entries: schemized,
            compiled,
            min_id,
            max_id
        });
    }

    onSubmit = nEntry => {
        // update the compiled section here; can be optimized here so that schemize does not have to reschema all existing entries unless there is a change

        let { entries, min_id, max_id } = this.state;

        let { entry, addedNewID } = newEntry(nEntry, entries, max_id);

        let newEntries = [...entries, entry];

        // important so that compiled range is accurate
        if (addedNewID) {
            max_id++;
        }
        
        let compiled = simplifyEntries(newEntries, range(min_id, max_id));

        this.setState({
            entries: newEntries,
            compiled,
            max_id
        })
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