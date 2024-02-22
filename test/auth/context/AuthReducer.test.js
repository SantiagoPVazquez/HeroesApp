import { authReducer, types } from "../../../src/auth";


describe('Tests in AuthReducer', () => { 
    
    test('should return default state', () => {
        const state = authReducer({logged: false}, {});
        expect(state).toEqual({logged: false});


     });

     test('should call login to authenticate and establish user', () => {
        const action = {
            type: types.login,
            payload: {
                name: 'RoninDev',
                id: 123
            }
        } 

        const state = authReducer('', action);
        expect(state).toEqual({logged: true, user: action.payload})
        

      });

      test('should call logout and delete username and logged should be false', () => { 
        const action = {
            type: types.logout,
        }
        const state = authReducer({logged: true}, action);
        expect(state).toEqual({logged: false});

       });

 });