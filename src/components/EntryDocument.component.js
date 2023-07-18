import "./styles/EntryDocument.style.scss";

export const EntryDocument = ({ type, name}) => {
    return (
        <div className="entry-document">
            {type === "folder" ? <i className="bi bi-folder"></i> : <i className="bi bi-file-text"></i>}
            <p>{name}</p>
        </div>
    );
}