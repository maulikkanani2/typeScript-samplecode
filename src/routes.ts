import SignIn from "./auth/components/signIn/SignIn";
import ResetPassword from "./auth/components/resetPassword/ResetPassword";
import AppView from "./app/appView/AppView";
import ApiList from "./apis/components/ApiList";
import AddApi from "./apis/components/AddApi";
import DashboardHome from "./dashboard/components/DashboardHome";
import ApiDetailDashboard from "./dashboard/components/ApiDetailDashboard";
import EventStream from "./eventStream/components/EventStream";

export enum RoutePathsEnum {
    API_LIST = '/a/apis',
    ADD_API = '/a/apis/new',
    EVENT_STREAM = '/a/apis/:id/events',
    DASHBOARD_VIEW = '/a/dashboard',
    DETAIL_DASHBOARD_VIEW = '/a/apis/:id/dashboard',
    SIGN_IN = '/sign-in',
    RESET_PASSWORD = '/reset-password',
    AUTHENTICATED_ROOT = '/a',
    UNAUTHENTICATED_ROOT = '/'
}

export default [
    {
        path: RoutePathsEnum.UNAUTHENTICATED_ROOT, exact: true, name: 'appView', component: AppView,
    },
    {
        path: RoutePathsEnum.AUTHENTICATED_ROOT, name: 'appView', component: AppView,
    },
    {path: RoutePathsEnum.SIGN_IN, name: 'signIn', component: SignIn},
    {path: RoutePathsEnum.RESET_PASSWORD, name: 'resetPassword', component: ResetPassword},
]

export const appRoutes = [
    {
        path: RoutePathsEnum.AUTHENTICATED_ROOT, exact: true, name: 'apiList', component: ApiList,
    },
    {
        path: RoutePathsEnum.API_LIST, exact: true, name: 'apiList', component: ApiList,
    },
    {
        path: RoutePathsEnum.ADD_API, exact: true, name: 'addApi', component: AddApi,
    },
    {
        path: RoutePathsEnum.EVENT_STREAM, name: 'eventStream', component: EventStream,
    },
    {
        path: RoutePathsEnum.DASHBOARD_VIEW, name: 'dashboardHome', component: DashboardHome,
    },
    {
        path: RoutePathsEnum.DETAIL_DASHBOARD_VIEW, name: 'dashboardDetail', component: ApiDetailDashboard,
    },
]
