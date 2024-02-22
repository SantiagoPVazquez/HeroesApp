const { render, screen } = require("@testing-library/react");
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PublicRoute } from "../../src/router/PublicRoute";


describe('Tests in <PublicRoute/>', () => { 
    
    test('should return children if its not authenticated', () => { 
        
        const contextValue = {
            logged: false
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <PublicRoute>
                    <h1>Public Route</h1>
                </PublicRoute>
            </AuthContext.Provider>
        )
        expect(screen.getByText('Public Route')).toBeTruthy();


     });

     test('should navigate if its authenticated', () => { 
        
        const contextValue = {
            logged: true,
            user: {
                name: 'Ronin',
                id: 123
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Public Route</h1>
                            </PublicRoute>
                        }/>
                        <Route path='marvel' element={<h1>Marvel Page</h1>}/>
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(screen.getByText('Marvel Page')).toBeTruthy();


      });



 });