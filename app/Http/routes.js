/* global Route */

import WelcomeRoutes from '~/modules/Welcome/Routes/welcome.routes';
import UserRoutes from '~/modules/User/Routes/user.routes';
import ContactRoutes from '~/modules/Contact/Routes/contact.routes';
import passport from 'passport';
export default app => {
    // Set app in route config
    Route.setApp(app);

    // Call your module routes here
    // e.g. UserRoutes(), AuthRoutes()
    Route.group({ middleware: ['api']}, () => {
        UserRoutes();
        ContactRoutes();
        // Route.post('/login', function(req, res) {
            
        //     passport.authenticate('tmj', function(err, user, info) {
        //         var throwErr = err || info;
        //         if (throwErr) {
        //             return res.status(400).send(throwErr);
        //         }
        
        //         req.logIn(user, function(err) {
        //             if (err) {
        //                 return res.status(400).send(err);
        //             }
        
        //             return res.json(user);
        //         });
        //     })(req, res);
        // });
    });
    Route.endGroup();
};
