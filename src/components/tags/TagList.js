import { useState, useEffect } from "react"
import { getAllTags, deleteTag } from "../managers/TagManager"
import { TagForm } from "./TagForm"

export const TagList = () => {
    const [tags, setTags] = useState([])
    const [editTag, setEditTag] = useState({ label: '' })
    const [deleteActive, setDeleteActive] = useState(false);
    const [tagId, setTagId] = useState(0)


    const loadTags = () => {
        getAllTags().then(tagsData => setTags(tagsData))
    }


    useEffect(() => {
        loadTags()
    }, [])

    const handleDelete = (tagId) => {
        setDeleteActive(true)
        setTagId(tagId)
    }


    return (
        <>
            <section className="section">
                <div className="columns">
                    <div className="column">
                        <table className="table is-fullwidth">
                            <head>
                                <tr>
                                    <th>Tags</th>
                                    <th></th>
                                </tr>
                            </head>
                            <body>ta
                                {
                                    tags.map(tag => (
                                        <tr key={tag.id}>
                                            <td>{tag.label}</td>
                                            <td>
                                                <div className="buttons">
                                                    <button className="button is-warning" onClick={() => { setEditTag(tag) }}>edit</button>
                                                    <button className="button is-danger" onClick={() => { handleDelete(tag.id) }}>delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </body>
                        </table>
                    </div>
                    <div className="column">
                        <TagForm loadTags={loadTags} tag={editTag} setTag={setEditTag} />
                    </div>
                </div>
            </section>

            <div className={deleteActive ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Delete Tag?</p>
                    </header>
                    <section className="modal-card-body">
                        Are you sure you want to delete this tag?
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success" onClick={() => {
                            deleteTag(tagId)
                                .then(loadTags).then(() => {
                                    setDeleteActive(false)
                                    setTagId(0)
                                })
                        }}>Delete</button>
                        <button className="button" onClick={() => { setDeleteActive(false) }}>Cancel</button>
                    </footer>
                </div>
            </div>
        </>
    )
}
