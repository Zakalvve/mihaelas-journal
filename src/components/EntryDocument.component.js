import "./styles/EntryDocument.style.scss";

export const EntryDocument = ({ type, name}) => {
    return (
        <div className="entry-document">
            {type === "folder" ? <i class="bi bi-folder"></i> : <i class="bi bi-file-text"></i>}
            <p>{name}</p>
        </div>
    );
}