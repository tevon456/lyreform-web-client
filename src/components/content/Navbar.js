import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../resources/icons/logo";
import styled from "styled-components";
import chroma from "chroma-js";
import { UICore } from "..";

const MainWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  padding: 4px;
  height: 44px;
  top: 0px;
  left: 0px;
  z-index: 8;
  list-style-type: none;
  margin: 0;
  position: fixed;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid var(--neutral-350);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 6px 8px -8px;
`;

const LinkWrap = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 576px) {
    display: none;
  }
`;

const StyledNavbarLogo = styled.ul`
  margin: 0px;
  display: flex;
  padding: 0px;
  align-items: center;
  > li {
    list-style: none;
    display: flex;
  }
  > li a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  > li a img {
    height: 32px;
  }
`;

function LinkMap({ type, to, text, component = <></> }) {
  const sharedStyles = {
    margin: "0px 8px",
    padding: "5px 8px",
    fontWeight: 500,
    borderRadius: "4px",
    border: "1px solid rgba(0,0,0,.1)",
  };
  const Styles = {
    link: {
      padding: sharedStyles.padding,
      margin: sharedStyles.margin,
      color: "var(--text-dark)",
      fontWeight: sharedStyles.fontWeight,
      display: "flex",
      alignItems: "center",
    },
    buttonPrimary: {
      padding: sharedStyles.padding,
      margin: sharedStyles.margin,
      background: "var(--primary)",
      borderRadius: sharedStyles.borderRadius,
      border: sharedStyles.border,
      fontWeight: sharedStyles.fontWeight,
      color: "#fff",
      display: "flex",
      alignItems: "center",
    },
    buttonSecondary: {
      padding: sharedStyles.padding,
      margin: sharedStyles.margin,
      background: "#fff",
      borderRadius: sharedStyles.borderRadius,
      border: sharedStyles.border,
      fontWeight: sharedStyles.fontWeight,
      display: "flex",
      alignItems: "center",
    },
  };
  switch (type) {
    case "link":
      return (
        <Link to={to} style={Styles[type]}>
          {text}
        </Link>
      );
    case "buttonPrimary":
      return (
        <span>
          <Link to={to} style={Styles[type]}>
            {text}
          </Link>
        </span>
      );
    case "buttonSecondary":
      return (
        <Link to={to} style={Styles[type]}>
          {text}
        </Link>
      );
    case "any":
      return <>{component}</>;
    default:
      return null;
  }
}

export default function Navbar({ colorLogo, links = [] }) {
  return (
    <>
      <MainWrapper id="navigation-bar">
        <UICore.Flex align="center">
          <UICore.Box mg="0px" ml="3vw" pd="0px">
            <NavbarLogo colorLogo={colorLogo} />
          </UICore.Box>
        </UICore.Flex>

        <UICore.Flex align="center">
          <LinkWrap>
            {links.map((link, index) => (
              <LinkMap key={index} {...link} />
            ))}
          </LinkWrap>
          <UICore.Box mg="0px" mr="3vw" pd="0px" />
        </UICore.Flex>
      </MainWrapper>
    </>
  );
}

function NavbarLogo({ to = "/", text = "Lyreform", colorText, colorLogo }) {
  return (
    <StyledNavbarLogo>
      <li>
        <Link tabIndex={0} to={to}>
          <Logo
            width="34px"
            height="34px"
            colorA={colorLogo}
            colorB={chroma(colorLogo || "#00204d")
              .darken()
              .hex()}
          />
          {/* <Layout.Space amount="2" /> */}
          <UICore.Text
            className="margin-top--none margin-bottom--none"
            color={colorText}
            weight={500}
            style={{ paddingRight: "1.5em" }}
          >
            {text}
          </UICore.Text>
        </Link>
      </li>
    </StyledNavbarLogo>
  );
}
