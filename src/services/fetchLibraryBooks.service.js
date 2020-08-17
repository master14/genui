const handleError = response => {
    if(response.status === 404) {
        return Promise.reject(new Error('Invalid URL..'));
    } else if(response.status === 500) {
        return Promise.reject(new Error('Some internal error occurred..'));
    } else if(response.status === 401) {
        return Promise.reject(new Error('UnAuthorized User..'));
    }
    return Promise.reject(new Error('Generic Error..'));
}

const apiKey=' ';

async function authenticateUser(userName, password) {
    const credentials = { userId: userName, userPassword:password };
    try {
        const response = await fetch('http://localhost:8765/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                },
                body: JSON.stringify(credentials)
            }
        );
        if (!response.ok) {
            return handleError(response);
        }
        const json = await response.json();
        return Promise.resolve(json);
    } catch (error) {
        return Promise.reject(error);
    }
}


async function addBook(userName, bookTitle,startTime,endTime) {
    let uniqueId;
    var now = new Date();
    uniqueId = now.getFullYear().toString(); 
    
    const book = { userId:userName, bookId: uniqueId, name:bookTitle,startTime:startTime,endTime:endTime };

    try {
        const response = await fetch(`http://localhost:8765/books/api/v1/user/${book.userId}/books`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                },
                body: JSON.stringify(book)
            }
        );
        if (!response.ok) {
            return handleError(response);
        }
        const json = {};
        return Promise.resolve(json);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function fetchBook(userName) {
    try {
        const response = await fetch(`http://localhost:8765/books/api/v1/user/${userName}/books/get`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                }
            }
        );
        if (!response.ok) {
            return handleError(response);
        }
        const json = await response.json();
        return Promise.resolve(json);
    } catch (error) {
        return Promise.reject(error);
    }
}

async function updateBook(userName) {
    try {
        const response = await fetch(`http://localhost:8765/books/api/v1/user/${userName}/books/{id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                }
            }
        );
        if (!response.ok) {
            return handleError(response);
        }
        const json = await response.json();
        return Promise.resolve(json);
    } catch (error) {
        return Promise.reject(error);
    }
}
async function deleteBook(userName) {
    try {
        const response = await fetch(`http://localhost:8765/books/api/v1/user/${userName}/books`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                }
            }
        );
        if (!response.ok) {
            return handleError(response);
        }
        const json = await response.json();
        return Promise.resolve(json);
    } catch (error) {
        return Promise.reject(error);
    }
}
export { authenticateUser, addBook, fetchBook,  updateBook,deleteBook,handleError, apiKey };