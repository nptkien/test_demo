class User {
    account: string;
    password: string;
    constructor(props: any) {
        if (!props) { props = {} }
        this.account = props.account ?? "";
        this.password = props.password ?? "";
    }
    toString() {
        return `this user: ${this.account} ---- pass: ${this.password}`;
    }
}