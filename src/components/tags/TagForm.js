import { updateTag, createTag } from "../managers/TagManager"


export const TagForm = ({ loadTags, tag, setTag }) => {
    const saveTagEvent = (event) => {
        event.preventDefault()
        if (tag.id) {
            updateTag(tag).then(loadTags)
        } else {
            createTag(tag).then((data) => {
                loadTags(data)
                setTag({ label: '' })
            })
        }
    }

    return (
        <>
            <form>
                <div className="field">
                    <label className="label">New Tag:</label>
                    <div className="control">

                        <input
                            required
                            type="text"
                            className="input"
                            value={tag.label}
                            onChange={
                                (evt) => {
                                    const copy = { ...tag }
                                    copy.label = evt.target.value
                                    setTag(copy)
                                }
                            } />
                    </div>
                </div>
                <div className="buttons">

                    <button
                        onClick={(evt) => {
                            saveTagEvent(evt)
                            setTag({ label: "" })
                        }}
                        className="button is-primary">
                        Save
                    </button>
                    {tag.label ? <button onClick={() => setTag({ label: "" })} className="button is-danger">Cancel</button> : ""}
                </div>
            </form>
        </>
    )
}
