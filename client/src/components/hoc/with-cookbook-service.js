import React from 'react';

import { CookbookServiceConsumer } from '../cookbook-service-context';

const withCookbookService = () => (Wrapped) => {
    return (props) => {
        return (
            <CookbookServiceConsumer>
                {
                    (cookbookService) => {
                        return <Wrapped {...props} cookbookService={cookbookService}/>;
                    }
                }
            </CookbookServiceConsumer>
        );
    }
}
export default withCookbookService;
