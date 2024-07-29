interface Paginate {
    current_page : number;
    data : any;
    first_page_url : string;
    from : string|null;
    last_page : number;
    last_page_url : string;
    links : PaginateLinks[];
    next_page_url : string|null;
    path : string;
    per_page : number;
    to : string|null;
    prev_page_url : string|null;
    total : number;
}

interface PaginateLinks {
    url :string|null;
    label : string;
    active: boolean;
}

interface Auth {
    user : User;
    history : UserHistory[]
}