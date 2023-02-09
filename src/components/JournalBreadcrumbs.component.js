import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { LinkContainer } from 'react-router-bootstrap';
import { journalDirectory } from '../modules/serverProxy';
import "./styles/JournalBreadcrumb.style.scss"

export const JournalBreadcrumbs = ({path}) => {

    const crumbs = journalDirectory.getNodePathAsIds(path);
    return (
        <>
            <Breadcrumb>
            {
                crumbs.map((crumb, i) => {
                    return (
                        i === crumbs.length - 1 
                        ?   <Breadcrumb.Item key={crumb.id}>{crumb.name}</Breadcrumb.Item>
                        :   <LinkContainer key={crumb.id} to={`/journal-browse/${crumb.id}`}>
                                <Breadcrumb.Item>{crumb.name}</Breadcrumb.Item>
                            </LinkContainer>
                    );
                })
            }
            </Breadcrumb>
        </>
    );
}