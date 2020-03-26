import { Application } from '../declarations';
import users from './users/users.service';
import retailers from './retailers/retailers.service';
import category from './category/category.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
    app.configure(users);
    app.configure(retailers);
    app.configure(category);
}
