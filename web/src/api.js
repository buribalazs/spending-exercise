const API_URL = 'http://localhost:5000'; // todo use env variable

function logAndThrow(e){
    console.error(e);
    throw e;
}

export function getSpendings(filters) {
    return fetch(`${API_URL}/spendings?sort=${filters.sort}&filter=${filters.filter}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })
        .then(async (res) => {
            const body = await res.json();
            return {
                status: res.status,
                spendings: body.spendings,
            };
        })
        .catch(logAndThrow)
}


export function postSpending(data) {
    return fetch(`${API_URL}/spendings`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
    })
        .then(async (res) => {
            return { status: res.status }
        })
        .catch(logAndThrow)
}
