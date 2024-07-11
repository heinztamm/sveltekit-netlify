export const GetQuery = async (link: string, token: string, query: string, params: object = {}) => {
    return fetch(link, {
        method: 'POST',
        headers: {
            'Content-Type': ' application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            query: query,
            parameters: params
        })
    }).then(response => response.json());
} 