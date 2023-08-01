class ApiError {
    message: string;
    status: number;
    constructor(args?: any) {
        if (!args) args = {};
        this.message = args.message ?? "";
        this.status = args.status ?? -1;
    }
    toString() {
        return `Api Error: ${this.status} --- ${this.message}`;
    }
}
export default ApiError;