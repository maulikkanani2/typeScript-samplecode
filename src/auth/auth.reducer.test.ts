import { SignInResponse , AuthChallenge} from "./auth.type";
import * as authActions from "./auth.action";
import authReducers from "./auth.reducer";
describe("auth.reducer", () => {

  describe("undefined action", () => {
    it("should return the default state", () => {
      const action = {} as any;      
      expect(authReducers(undefined, action)).toMatchObject({pending: false});
    });
  });

  describe("SIGN_IN_SUCCEEDED action", () => {
    it("it should return sign In success state with user", async function() {     
        const user = { userName: "sogisiyi@freetmail.in", cognitoUser: null };
        const result: SignInResponse = { user: user,  challenge: undefined, };
        const action: authActions.SignInSucceededAction = {
          type: authActions.SIGN_IN_SUCCEEDED,  
          payload: result,
        };              
        expect(authReducers({ pending: true}, action)).toMatchSnapshot();     
    });
    it("it should return new password In success  state with user", async function() {     
        const user = { userName: "sogisiyi@freetmail.in", cognitoUser: null };
        const Challenge : AuthChallenge = { challengeName :'NEW_PASSWORD_REQUIRED' , challengeParams:{username:user.userName} }
        const result: SignInResponse = { user: user,  challenge: Challenge };
        const action: authActions.SignInSucceededAction = {type: authActions.SIGN_IN_SUCCEEDED, payload: result };              
        expect(authReducers({ pending: true}, action)).toMatchSnapshot();     
    });
  });

  describe("RETRIEVE_CURRENT_USER_SUCCEEDED action", () => {
    it("it should return from retive current user", async function() {     
        const user = { userName: "sogisiyi@freetmail.in", cognitoUser: null };
        const action: authActions.RetrieveCurrentUserActionSucceeded = {
          type: authActions.RETRIEVE_CURRENT_USER_SUCCEEDED,          
          payload: user,
        };                    
        expect(authReducers({pending : true}, action)).toMatchSnapshot();      
    });
  });

  describe("COMPLETE_NEW_PASSWORD_SUCCEEDED action", () => {
    it("it should return new password with user", async function() {   
        const user = { userName: "sogisiyi@freetmail.in", cognitoUser: null };
        const action: authActions.CompleteNewPasswordActionSucceeded = {
          type: authActions.COMPLETE_NEW_PASSWORD_SUCCEEDED,
          payload: user,
        };
        expect(authReducers({pending : true}, action)).toMatchSnapshot();     
    });
  });

  describe("SIGN_OUT_SUCCEEDED action", () => {
    it("it should return from sign out user action", () => {
      let action: authActions.SignOutActionSucceeded = {
        type: authActions.SIGN_OUT_SUCCEEDED,
      };      
      return expect(authReducers({pending : true}, action)).toEqual({pending : false});
    });
  });

  describe("COMPLETE_NEW_PASSWORD_FAILED action", () => {
    it("it should return faild user password deatils", () => {      
      let action: authActions.CompleteNewPasswordActionFailed = {
        type: authActions.COMPLETE_NEW_PASSWORD_FAILED,
        payload: null,
      };
      return expect(authReducers({pending : true}, action)).toEqual({ pending: false, error: null});
    });
  });

  describe("SIGN_OUT_FAILED action", () => {
    it("it should return sign out fail reason ", () => {   
      let action: authActions.SignOutActionFailed = {
        type: authActions.SIGN_OUT_FAILED,
        payload: null,
      };
      return expect(authReducers({pending : true}, action)).toEqual({pending: false , error : null});
    });
  });

  describe("RETRIEVE_CURRENT_USER_FAILED action", () => {
    it("it should return next state with user", () => {
      const user = { userName: "sogisiyi@freetmail.in", cognitoUser: null };      
      let action: authActions.RetrieveCurrentUserActionFailed = {
        type: authActions.RETRIEVE_CURRENT_USER_FAILED,
        payload: undefined,
      };
      return expect(authReducers({pending: false, user: user}, action)).toMatchSnapshot();
    });
  });
});
