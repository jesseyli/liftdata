const randomNum = (min, max) => Math.floor(Math.random() * (max - min) + min);

const exercises = ['squat', 'deadlift', 'bench', 'overhead press'];

const randomEntry = () => ({
    exercise: exercises[randomNum(0, exercises.length)],
    weight: randomNum(100, 316),
    unit: 'lb',
    sets: randomNum(1, 6),
    reps: randomNum(4, 13)
});

// adds a schema_id to all logs so that we can sort simply
// min_id/max_id represents range of schema_id's (inclusive/inclusive)
const schemize = (nonschema, schema, id, min_id) => {
    if (nonschema.length === 0) {
        return {
            schema,
            min_id,
            max_id: id - 1
        };
    } else {
        let newNon = nonschema.filter(x => !isLikeEntries(x, nonschema[0]));
        let newSchema = [...schema, ...addSchemaID(nonschema.filter(x => isLikeEntries(x, nonschema[0])), id)];
        return schemize(newNon, newSchema, id + 1, min_id)
    }
}

const addSchemaID = (logs, schema_id) => logs.map(log => ({ ...log, schema_id }));

const randomDay = () => [...Array(15)].map(x => randomEntry());

const sample = [
    {
        "exercise": "bench",
        "weight": 200,
        "unit": "lb",
        "sets": 4,
        "reps": 5
    },
    {
        "exercise": "deadlift",
        "weight": 131,
        "unit": "lb",
        "sets": 3,
        "reps": 4
    },
    {
        "exercise": "deadlift",
        "weight": 131,
        "unit": "lb",
        "sets": 8,
        "reps": 4
    },
    {
        "exercise": "bench",
        "weight": 200,
        "unit": "lb",
        "sets": 1,
        "reps": 5
    },
    {
        "exercise": "overhead press",
        "weight": 132,
        "unit": "lb",
        "sets": 5,
        "reps": 9
    },
    {
        "exercise": "bench",
        "weight": 200,
        "unit": "lb",
        "sets": 5,
        "reps": 5
    }
];

console.log(sample);

console.log(schemize(sample, [], 0, 0));

