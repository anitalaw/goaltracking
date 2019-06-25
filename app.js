const form = document.querySelector('#add-goal');
const listGoals = document.querySelector('#list-goals');
const doneGoals = document.querySelector('#done-goals');

// ######### GETTING DATA in Real-time Listener
db.collection('goalstracking').onSnapshot((snapshotResults) => {
    let changes = snapshotResults.docChanges();
        console.log('show changes', changes);
    changes.forEach((eachChange) => {
        if (eachChange.type === 'added') {
            renderGoals(eachChange.doc);
        } else if (eachChange.type === 'removed') { 
            let li =  doneGoals.querySelector(`[data-id=${eachChange.doc.id}]`);
            doneGoals.removeChild(li);
        } else if (eachChange.type === 'modified') {
            renderGoals(eachChange.doc)
            let li = listGoals.querySelector(`[data-id=${eachChange.doc.id}]`);
            listGoals.removeChild(li);
        }
    })
})


// ######### SAVING DATA
/* 
1) Grab the form id
2) grab the reference that interacts with our firebase db 
3) .add() => takes in a key-value pair and adds a NEW DOCUMENT (aka record)

*/

form.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('goalstracking').add({
        goal: form.goal.value,
        timeframe: form.timeframes.value,
        done: false
    });
    form.goal.value = '';
});



// create element and render goals
function renderGoals(doc) {
    if (doc.data().done === false) {
        let li = document.createElement('li');
        let goal = document.createElement('span');
        let isDone = document.createElement('button');

        li.setAttribute('data-id', doc.id);
        goal.textContent = `${doc.data().goal} -- (${doc.data().timeframe})`;
        isDone.textContent = 'Completed';

        li.appendChild(goal);
        li.appendChild(isDone);
        listGoals.appendChild(li);

        // ######### UPDATING DATA
        isDone.addEventListener('click', (e)=> {
            e.stopPropagation();
            let eachId = e.target.parentElement.getAttribute('data-id');
            db.collection('goalstracking').doc(eachId).update({
                done: true
            });
        });

    } else {
        let li = document.createElement('li');
        let goal = document.createElement('span');
        let deleteGoal = document.createElement('button');

        li.setAttribute('data-id', doc.id);
        goal.textContent = doc.data().goal;
        deleteGoal.textContent = 'Remove forever';

        li.appendChild(goal);
        li.appendChild(deleteGoal);

        doneGoals.appendChild(li);

        // ######### DELETING DATA 
        deleteGoal.addEventListener('click', (e) => {
            e.stopPropagation(); 
            let eachId = e.target.parentElement.getAttribute('data-id');
            db.collection('goalstracking').doc(eachId).delete();
        });
    }

}






