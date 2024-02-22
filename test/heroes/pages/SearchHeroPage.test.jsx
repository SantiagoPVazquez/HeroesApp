import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { SearchHeroPage } from '../../../src/heroes';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));

describe('Tests in <SearchHeroPage/>', () => { 

    beforeEach(() => jest.clearAllMocks() );
    
    test('should show correctly with default values', () => { 
        
        const {container} = render(
            <MemoryRouter>
                <SearchHeroPage/>
            </MemoryRouter>
        )
        
        expect(container).toMatchSnapshot();

     });

     test('should show hero was not found', () => { 

        render(
            <MemoryRouter initialEntries={['/search?q=wrongheroname']}>
                <SearchHeroPage/>
            </MemoryRouter>
        )

        expect(screen.getByText('was not found')).toBeTruthy();

      });

     test('should show Spider-man and input with queryString value', () => { 
        
        render(
            <MemoryRouter initialEntries={['/search?q=spider']}>
                <SearchHeroPage/>
            </MemoryRouter>
        )
        
        const input = screen.getByRole('textbox');
        expect(input.value).toBe('spider');

        const img = screen.getByRole('img');
        expect(img.src).toContain('/assets/heroes/marvel-spider.jpg')

     });


     test('should call navigate to new page', () => {
        
        const inputValue = 'spider'
        
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchHeroPage/>
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {name: 'searchText', value: inputValue}});

        const form = screen.getByLabelText('form')
        fireEvent.submit(form);
        
        expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);
      });



 });