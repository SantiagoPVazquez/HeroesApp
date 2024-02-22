import { types } from "../../../src/auth";


describe('Tests in Types', () => { 
    
    test('should return login and logout types', () => { 
        
        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        })
     });


 });