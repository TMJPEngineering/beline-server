/* global Route, config, namespace */

export default () => {
    namespace(config.modules.user);

    Route.post('/login', 'UserController@index');
    Route.get('/search-contacts', 'UserController@search');
    Route.post('/add-contact', 'UserController@add');
};
