import React from 'react';
import { useLocation } from 'react-router-dom'; // Remove Switch and Route import
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './animations.css'; // Import your CSS file for animations
import { router } from '../../../routes/route'; // Import routes from route.js
import { Route as BrowserRouterRoute } from "react-router-dom"; // Rename Route to BrowserRouterRoute

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <TransitionGroup>
            <CSSTransition
                key={location.key}
                classNames="fade"
                timeout={500}
            >
                {router}
            </CSSTransition>
        </TransitionGroup>
    );
};

export default AnimatedRoutes;
