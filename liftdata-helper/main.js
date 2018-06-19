

const exercise = 'squat';
const weight = 100;
const unit = 'lb';
const sets = 2;
const reps = 5;

let day = {
    date: new Date(),
    log: [
        {
            exercise: 'squat',
            weight: 100,
            unit: 'lb',
            sets: 2,
            reps: 5
        },
        {
            exercise: 'squat',
            weight: 100,
            unit: 'lb',
            sets: 2,
            reps: 5
        },
        {
            exercise: 'squat',
            weight: 100,
            unit: 'lb',
            sets: 2,
            reps: 5
        },
    ]
}


const calculateSets = (arr) => arr.reduce((a, c) => a + c.sets, 0);

// allows us to combine redundant entries into one entry with adjusted set count
// convert array of like objects to one object
const combineLikeEntries = arr => ({
    ...arr[0],
    sets: calculateSets(arr)
});

const simplifyEntries = (logs, schemas) => [...schemas.map(id => combineLikeEntries(getSchemaLogs(logs, id)))];
   
const getSchemaLogs = (logs, id) => logs.filter(({ schema_id }) => schema_id === id);

const isLikeEntries = (logA, logB) => (
    logA.exercise === logB.exercise
    && logA.weight === logB.weight
    && logA.unit === logB.unit
    && logA.reps === logB.reps
);


const logs = [
    {
        schema_id: 1,
        exercise: 'squat',
        weight: 100,
        unit: 'lb',
        sets: 3,
        reps: 10
    },
    {
        schema_id: 2,
        exercise: 'squat',
        weight: 100,
        unit: 'lb',
        sets: 2,
        reps: 5
    },
    {
        schema_id: 2,
        exercise: 'squat',
        weight: 100,
        unit: 'lb',
        sets: 6,
        reps: 5
    },
];

