/* global Route, config, namespace */

export default () => {
    namespace(config.modules.contact);

    Route.get('/get-contacts', 'ContactController@show');
    Route.post('/delete-contact', 'ContactController@delete');
};
