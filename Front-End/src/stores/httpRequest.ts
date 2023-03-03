const httpRequest = async(method: string, url:string, payload?:any) => {
    console.log(payload);
    const headers = {
        'Content-Type': 'application/json',
    }
    const response = await fetch(url, {
        headers,
        method,
        body: payload!==undefined? JSON.stringify(payload): null
    })

    return response.json();
};

export default httpRequest;