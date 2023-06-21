const department = {
    page: 1,
    page_size: 10,
    limit: 20,
    search: ''
};

const position = {
    page: 1,
    page_size: 10,
    limit: 20,
    search: ''
};

const business = {
    page: 1,
    page_size: 10,
    limit: 20,
    search: '',
    status: ''
};

const candidate = {
    start:0,
    length:10,
    searchValue:"Dydy",
    orderColumn:"id",
    ordinal:"asc"
}

export const filter = {
    candidate,
    department,
    position,
    business
};
