import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui/components/Navbar";


const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));

describe('Tests in <Navbar/>', () => { 
    
    const contextValue = {
        logged: true,
        user: {
            name: 'Ronin',
            id: 123
        },
        logout: jest.fn()
    }

    beforeEach(() => jest.clearAllMocks());

    test('should show user name if authenticated', () => { 
        

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        );
        
        expect(screen.getByText(contextValue.user.name)).toBeTruthy();


     });

     test('should call logout and navigate to login when Logout is clicked', () => { 
        
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        );
        const logoutBtn = screen.getByRole('button');
        fireEvent.click(logoutBtn);

        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', {"replace": true});
        

      });

 });