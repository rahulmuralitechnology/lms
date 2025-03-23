import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import Home from '../components/Home';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import TeacherDashboard from '../components/Teacher/TeacherDashboard';
import StudentDashboard from '../components/Student/StudentDashboard';
import ParentDashboard from '../components/Parent/ParentDashboard';
import ViewWhiteboards from '../components/ViewWhiteboards';
import { AuthProvider } from '../context/AuthContext'; // Import AuthProvider

// Mock the context
jest.mock('../context/AuthContext', () => ({
    AuthProvider: ({ children }) => <div>{children}</div>,
    useAuth: () => ({
        user: null,
        login: jest.fn(),
        logout: jest.fn(),
    }),
}));

describe('App Component', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<App />);
        expect(wrapper).toBeDefined();
    });

    it('renders the Navbar component', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find('Navbar').exists()).toBe(true);
    });

    it('renders the Home component at the "/" route', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );
        expect(wrapper.find(Home).exists()).toBe(true);
    });

    it('renders the Login component at the "/login" route', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/login']}>
                <App />
            </MemoryRouter>
        );
        expect(wrapper.find(Login).exists()).toBe(true);
    });

    it('renders the Register component at the "/register" route', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/register']}>
                <App />
            </MemoryRouter>
        );
        expect(wrapper.find(Register).exists()).toBe(true);
    });

    it('renders the TeacherDashboard component at the "/teacher" route', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/teacher']}>
                <App />
            </MemoryRouter>
        );
        expect(wrapper.find(TeacherDashboard).exists()).toBe(true);
    });

    it('renders the StudentDashboard component at the "/student" route', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/student']}>
                <App />
            </MemoryRouter>
        );
        expect(wrapper.find(StudentDashboard).exists()).toBe(true);
    });

    it('renders the ParentDashboard component at the "/parent" route', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/parent']}>
                <App />
            </MemoryRouter>
        );
        expect(wrapper.find(ParentDashboard).exists()).toBe(true);
    });

    it('renders the ViewWhiteboards component at the "/whiteboards" route', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/whiteboards']}>
                <App />
            </MemoryRouter>
        );
        expect(wrapper.find(ViewWhiteboards).exists()).toBe(true);
    });

    it('renders the 404 page for unknown routes', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/unknown']}>
                <App />
            </MemoryRouter>
        );
        expect(wrapper.text()).toContain('404 - Page Not Found');
    });

    it('wraps the application with AuthProvider', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(AuthProvider).exists()).toBe(true);
    });

    // Edge Cases

    it('handles empty route gracefully', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['']}>
                <App />
            </MemoryRouter>
        );
        expect(wrapper.find(Home).exists()).toBe(true); // Defaults to home
    });

    it('renders correctly with complex routes', () => {
       const wrapper = mount(
            <MemoryRouter initialEntries={['/student/some/nested/path']}>
                <App />
            </MemoryRouter>
        );
        expect(wrapper.text()).toContain('404 - Page Not Found'); //no component mapped to this route so goes to error page
    });

    it('handles special characters in route gracefully', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/student?param1=value1&param2=value2']}>
                <App />
            </MemoryRouter>
        );
         expect(wrapper.text()).toContain('404 - Page Not Found'); //no component mapped to this route so goes to error page
    });

    it('renders different routes based on initialEntries', () => {
        const homeWrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );
        expect(homeWrapper.find(Home).exists()).toBe(true);

        const loginWrapper = mount(
            <MemoryRouter initialEntries={['/login']}>
                <App />
            </MemoryRouter>
        );
        expect(loginWrapper.find(Login).exists()).toBe(true);

        const notFoundWrapper = mount(
            <MemoryRouter initialEntries={['/random']}>
                <App />
            </MemoryRouter>
        );
         expect(notFoundWrapper.text()).toContain('404 - Page Not Found');
    });


});

