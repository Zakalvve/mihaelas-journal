import React, { useState, useEffect } from 'react';
import MarkdownView from 'react-showdown';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./styles/JournalEntry.style.scss";
import { scrollToTop } from '../modules/Helpers';

export const JournalEntry = ({entryNode}) => {
    const [markdown, setMarkdown] = useState(entryNode.data.file.data);
    const [loadError, /*setLoadError*/] = useState(false);

    useEffect(() => {
        setMarkdown(entryNode.data.file.data);
    },[entryNode]);

    const handleScrollTop = () => {
        scrollToTop(true);
    }

    const previousId = () => {
        if (entryNode.data.traversal.last)
            return entryNode.data.traversal.last.data.id;
        else return entryNode.id;
    }
    const nextId = () => {
        if (entryNode.data.traversal.next)
            return entryNode.data.traversal.next.data.id;
        else 
            return entryNode.id;
    }

    return (
        <div id="journal-entry">
            {loadError ? <p>Error</p> : <MarkdownView markdown={markdown} options={strikethrough:true}/>}
            <Row className="py-2">
                <Col className="text-center" md={{span: 2, offset: 1}} xs={{span:3, offset:1}}>
                    <Link onClick={handleScrollTop} className="btn btn-nav" to={`/journal/${previousId()}`}>
                        <i className="bi bi-arrow-left"></i>
                    </Link>
                </Col>
                <Col className="text-center" md={{span:2, offset: 6}} xs={{span: 3, offset:4}}>
                    <Link onClick={handleScrollTop} className="btn btn-nav" to={`/journal/${nextId()}`}>
                        <i className="bi bi-arrow-right"></i>
                    </Link>
                </Col>
            </Row>         
        </div>
    );
  };
