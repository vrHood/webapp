import { Application } from '../declarations';

import category from './categories/categories.service';
import retailers from './retailers/retailers.service';
import signup from './signup/signup.service';
import users from './users/users.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
    app.configure(category);
    app.configure(retailers);
    app.configure(signup);
    app.configure(users);
}
