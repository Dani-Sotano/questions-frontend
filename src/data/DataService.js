
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
    return data.categories
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
    return data.goals
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


export { getQuestions, getCategories, getGoals }
