class LangflowClient {
    constructor(baseURL, apiKey) {
        this.baseURL = baseURL;
        this.apiKey = apiKey;
    }

    async post(endpoint, body, headers = {"Content-Type": "application/json"}) {
        if (this.apiKey) {
            headers["Authorization"] = `Bearer ${this.apiKey}`;
        }
        const url = `${this.baseURL}${endpoint}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });
            
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return await response.json();
            } else if (contentType && contentType.indexOf("text/html") !== -1) {
                const textResponse = await response.text();
                return { isHtml: true, html: textResponse };
            } else {
                return { isHtml: true, html: `Error desconocido. Content-Type: ${contentType}` };
            }
        } catch (error) {
            console.error('Request Error:', error);
            return { isHtml: true, html: 'Ocurrió un error al intentar realizar la solicitud.' };
        }
    }

    async initiateSession(inputValue, stream = false) {
        const endpoint = `/api/v1/run/c6d4e8b2-8012-4d49-88ed-84e9f24a712f?stream=${stream}`;
        return this.post(endpoint, { input_value: inputValue });
    }
}

export default LangflowClient;
