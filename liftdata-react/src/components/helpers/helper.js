const range = (min, max) => [...Array(max - min).keys()].map(num => num + min);

const addSchemaID = (logs, schema_id) => logs.map(log => ({ ...log, schema_id }));

const calculateSets = (arr) => arr.reduce((a, c) => a + c.sets, 0);

// allows us to combine redundant entries into one entry with adjusted set count
// convert array of like objects to one object
const combineLikeEntries = arr => ({
    ...arr[0],
    sets: calculateSets(arr)
});


const getSchemaLogs = (logs, id) => logs.filter(({ schema_id }) => schema_id === id);

const isLikeEntries = (logA, logB) => (
    logA.exercise === logB.exercise
    && logA.weight === logB.weight
    && logA.unit === logB.unit
    && logA.reps === logB.reps
);

const addSchemaIDtoOne = (entry, schema_id) => ({ ...entry, schema_id });

const findLikeEntries = (entry, logs) => logs.filter(log => isLikeEntries(log, entry));

// main functions


// adds a schema_id to all logs so that we can sort simply
// min_id/max_id represents range of schema_id's (inclusive/exclusive)
const schemize = (nonschemized, schemized, id, min_id) => {
    if (nonschemized.length === 0) {
        return {
            schemized,
            min_id,
            max_id: id
        };
    } else {
        let newNon = nonschemized.filter(x => !isLikeEntries(x, nonschemized[0]));
        let newSchemized = [...schemized, ...addSchemaID(nonschemized.filter(x => isLikeEntries(x, nonschemized[0])), id)];
        return schemize(newNon, newSchemized, id + 1, min_id)
    }
}

// can optimize schemize for new single additions before reschemizing
const newEntry = (entry, logs, max_id) => {
    const likeEntries = findLikeEntries(entry, logs);

    if (likeEntries.length > 0) {
        const { schema_id } = likeEntries[0];
        return { entry: addSchemaIDtoOne(entry, schema_id), addedNewID: false };
    } else {
        return { entry: addSchemaIDtoOne(entry, max_id), addedNewID: true };
    }
    // need to manually set max_id ++ in this.setState
}


// this combines and reduces all the logs into an array of simple forms
const simplifyEntries = (logs, schema_ids) => [...schema_ids.map(id => combineLikeEntries(getSchemaLogs(logs, id)))];

export { range, schemize, newEntry, simplifyEntries }; 