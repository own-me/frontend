import React, { memo } from "react";
import styled from "styled-components";
import { Transition } from "react-transition-group";
import { navLinks } from "./Navbar";
import { Link } from "react-router-dom";

const SideNavTimeout = 300;

const SideNavContainer = styled.div`
    width: 400px;
    height: calc(100% - 90px);
    position: fixed;
    top: 90px;
    right: 0;
    z-index: 3;
    background-color: #FF81EB;
    color: white;
    transition: transform ${SideNavTimeout}ms ease-in-out;
    box-shadow: 0 3px 6px #53414128, 0 3px 6px rgba(0, 0, 0, 0.23);
    display: flex;
    flex-direction: column;

    &.entering {
        transform: translateX(100%);
    }

    &.exiting {
        transform: translateX(100%);
    }
`;

const NavLink = styled(Link) <{ $isActive: boolean }>`
    font-family: Rock Salt, Open Sans; 
    margin: 0 50px;
    color: ${props => props.$isActive ? "#00ffff" : "white"}; 
    text-decoration: none;
    font-size: 25px;
    font-weight: 600;
    padding: 20px;

    :hover {
        color: "#00ffff";
    }
`;

const OpaqueBackground = styled.div`
    height: 100%;
    width: 100%;
    position: fixed;
    z-index: 2;
    background-color: rgb(253 117 255 / 20%);
    transition: opacity ${SideNavTimeout}ms ease-in-out;

    &.entering {
        opacity: 0.8;
    }

    &.exiting {
        opacity: 0;
    }
`;

interface SideNavProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const SideNav = memo(({ isOpen, setIsOpen }: SideNavProps) => {
    return (
        <Transition in={isOpen} timeout={{ enter: 0, exit: SideNavTimeout }} mountOnEnter unmountOnExit>
            {transitionState => (
                <>
                    <SideNavContainer className={transitionState}>
                        {
                            navLinks.map(({ title, path }, index) => {
                                return <NavLink to={path} key={index} $isActive={location.pathname === path}>{title}</NavLink>;
                            })
                        }
                    </SideNavContainer>
                    <OpaqueBackground className={transitionState} onClick={() => setIsOpen(false)} />
                </>
            )}
        </Transition>
    );
});

export default SideNav;