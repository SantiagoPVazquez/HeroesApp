import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { AppRouter } from "../../src/router/AppRouter"

describe('Tests in <AppRouter/>', () => { 
    
    test('should show login if not athenticated', () => { 

        const contextValue = {
            logged: false
        }
        
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect(screen.getAllByText('Login').length).toBe(2);

     });

     test('should show Marvel component if authenticated', () => { 
        
        const contextValue = {
            logged: true,
            user: {
                name: 'Ronin',
                id: 123
            }
        }
        
        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        )

        expect(screen.getByText('Marvel Comics')).toBeTruthy();

      });



 });