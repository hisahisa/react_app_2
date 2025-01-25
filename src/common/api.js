import cookie from "react-cookies";

export class ApiError extends Error {
    constructor(status, data) {
        super(data.message);
        this.status = status;
        this.data = data;
    }
}

const BASE_URL = process.env.API_BASE_URL || "http://127.0.0.1:5000";

class ApiService {
    async get(path) {
        return this.fetchData("GET", null, path);
    }

    async post(path, body) {
        return this.fetchData("POST", body, path);
    }

    async put(path, body) {
        return this.fetchData("PUT", body, path);
    }

    async delete(path) {
        return this.fetchData("DELETE", null, path);
    }

    async fetchData(method, body, path = "") {
        const url = `${BASE_URL}/${path}`;
        const headers = { "Content-Type": "application/json" };
        const csrf_access_token = cookie.load("csrf_access_token");
        if (csrf_access_token) headers["X-CSRF-TOKEN"] = csrf_access_token;

        let bodyContent = body;
        if (body && typeof body === "object" ) {
            bodyContent = JSON.stringify(body);
        } else if (body instanceof FormData) {
            delete headers["Content-Type"];
        }

        try {
            const res = await fetch(url, {
                headers: headers,
                method: method,
                body: bodyContent,
                mode: "cors"
            });

            const statusCode = res.status;
            const contentType = res.headers.get("Content-Type") || "";
            const rtnData = await this.parseResponse(contentType, res);

            if (400 <= statusCode) {
                this.handleError(new ApiError(statusCode, rtnData))
            }

            return rtnData;
        } catch (e) {
            this.handleError(e);
        }
    }

    parseResponse(contentType, res) {
        if (contentType.startsWith("application/json")) {
            return res.json();
        } else if (contentType.startsWith("text/plain")) {
            return res.text();
        } else {
            return res.blob();
        }
    }

    handleError(e) {
        if (e instanceof ApiError) {
            throw e;
        }
        if ("Failed to fetch".includes(e.message)) {
            const msg = `${e.message}: Not Found Endpoint.`;
            throw new ApiError(404, { message: msg });
        }
        throw new ApiError(999, { message: e.message });
    }
}

export default new ApiService();
