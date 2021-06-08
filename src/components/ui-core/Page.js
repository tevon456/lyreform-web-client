import React from "react";
import styled from "styled-components";

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tabletS: "475px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tabletS: `(max-width: ${size.tabletS})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`,
};

/**
 * Used as parent for Page Components.
 * @prop {boolean} padding: Enable or disable responsive padding
 */
function Page({ background, ...props }) {
  let xxxl = "var(--space-xxxl)";
  let xxl = "var(--space-xxl)";
  let md = "var(--space-md)";
  let sm = "var(--space-sm)";

  if (props.padding === false) {
    sm = "var(--space-xs)";
    md = "var(--space-xs)";
    xxl = "var(--space-xs)";
    xxxl = "var(--space-xs)";
  }

  const Content = styled.main`
    padding-bottom: var(--space-md);

    @media ${device.desktopL} {
      padding-top: var(--space-xxl);
      padding-bottom: var(--space-xxl);
      padding-left: ${xxxl};
      padding-right: ${xxxl};
    }

    @media ${device.desktop} {
      padding-top: var(--space-xxl);
      padding-bottom: var(--space-xxl);
      padding-left: calc(${xxxl});
      padding-right: calc(${xxxl});
    }

    @media ${device.laptop} {
      padding-top: var(--space-xxl);
      padding-bottom: var(--space-xxl);
      padding-left: ${xxl};
      padding-right: ${xxl};
    }

    @media ${device.tablet} {
      padding-top: var(--space-xl);
      padding-bottom: var(--space-xl);
      padding-left: ${md};
      padding-right: ${md};
    }

    @media ${device.mobileL} {
      padding-top: var(--space-xl);
      padding-bottom: var(--space-xl);
      padding-left: ${sm};
      padding-right: ${sm};
    }
  `;

  if (window.top === window.self) {
    return (
      <Content id="page" className={props.className} {...props}>
        {props.children}
      </Content>
    );
  } else {
    return (
      <Content id="page" className={props.className} {...props}>
        {props.children}
      </Content>
    );
  }
}

export default Page;
