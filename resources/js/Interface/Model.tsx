interface Blog {
    id : number;
    slug : string;
    title : string;
    content : string;
    tags : string;
    category : string;
    thumbnail : string;
    user : User;
    created_at : string;
    updated_at : string;
}

interface BlogCategory {
    id : number;
    name : string;
}



interface User {
    id : number;
    nid : string;
    name : string;
    email : string;
    password : string;
    histories : UserHistory[]
}

interface UserHistory {
    id : number;
    user_id : number;
    setting_id :number;
    jabatan : string;
    start_date : string;
    end_date : string;
}

interface Comment {
    blog_id : number;
    parent_id : number;
    author : string;
    comment : string;
}

interface Setting {
    id : number;
    semester : number;
    user_id : number;
    name : string;
    address : string;
    postal_code : string;
    country : string;
    logo : string;
    phone : string;
    email : string;
    content : string;
    user : User;
    updated_at : string;
    created_at : string;
}

interface Kelas {
    id : number;
    name : string;
}

interface Absen {
    id : number;
    setting_id : number;
    user_id : number;
    status : string;
    jam_dinas : string;
    tanggal : string;
    keterangan : string;
    user : User
}


