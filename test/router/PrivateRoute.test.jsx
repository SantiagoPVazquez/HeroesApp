import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { MemoryRouter } from "react-router-dom";

describe('Tests in <PrivateRoute/>', () => { 
    
    test('should show children if its athenticated', () => {
        
        Storage.prototype.setItem = jest.fn();
        
        const contextValue = {
            logged: true,
            user: {
                name: 'Ronin',
                id: 123
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <PrivateRoute>
                        <h1>Private Route</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )
        
        expect(screen.getByText('Private Route')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel');
     });






 });