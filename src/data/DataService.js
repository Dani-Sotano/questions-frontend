const REQUEST_OPTIONS = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
};

async function getCategories() {
    try {
        let response = await fetch(`http://localhost:5001/questions/categories`)
        if (response.ok) {
            let data = await response.json();
            return data.categories
        } else {
            console.log("questions could not have been fetched", response.status, response.statusText)
        }
    } catch (err) {
        console.error(err);
    }
    return []
}


async function getGoals(category) {
    try {
        let response = await fetch(`http://localhost:5001/questions/goals/${category}`)
        if (response.ok) {
            let data = await response.json();
            return data.goals
        } else {
            console.log("questions could not have been fetched", response.status, response.statusText)
        }
    } catch (err) {
        console.error(err);
    }
    return []
}

async function getQuestions(category, goal) {
    try {
        let response = await fetch(`http://localhost:5001/questions/list/${category}/${goal}`)
        if (response.ok) {
            let data = await response.json();
            return data.questions
        } else {
            console.log("questions could not have been fetched", response.status, response.statusText)
        }
    } catch (err) {
        console.error(err);
    }
}

async function saveQuestionToDB(question, classifications) {
    try {
        let options = REQUEST_OPTIONS;
        options.body = JSON.stringify(
            { 
                question: question, 
                classifications: Object.fromEntries(classifications)
             }
        )

        let response = await fetch(`http://localhost:5001/questions/newquestion`, options)

        if (response.ok) {
            let data = await response.json();
            return data.questions
        } else {
            console.log("questions could not have been fetched", response.status, response.statusText)
        }
    } catch (err) {
        console.error(err);
    }

}


export { getQuestions, getCategories, getGoals, saveQuestionToDB }
