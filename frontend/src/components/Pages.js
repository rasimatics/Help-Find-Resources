import React, { useState } from 'react'
import { Pagination } from 'react-bootstrap'
import { v4 as uuid } from 'uuid'

function Pages(props) {

    const [page, setPage] = useState(1);

    let items = props.items
    let postPerpage = 5
    let pages = Math.ceil(items.length / postPerpage)
    let resources = []


    resources.push(<Pagination.Prev onClick={() => paginate(page - 1, postPerpage)} />)

    for (let i = 1; i <= pages; i++) {
        resources.push(<Pagination.Item key={uuid()} className={i == page ? "active" : ""} onClick={() => paginate(i, postPerpage)}>{i}</Pagination.Item>)
    }

    resources.push(<Pagination.Next onClick={() => paginate(page + 1, postPerpage)} />)

    const paginate = (i, postPerpage, ) => {
        if (i >= 1 && i <= pages) {
            props.navigate(i, postPerpage)
            setPage(i)
        }
    }
    return (
        <Pagination style={{ marginLeft: "200px", marginRight: "auto" }}>
            {resources}
        </Pagination>
    )
}
export default Pages
