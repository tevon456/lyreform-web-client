import styled from "styled-components";

/**
 * A base component used for composing more complex components like cards and alerts etc
 * @prop {string} size - sizes [sm,md,lg]
 * @prop {string} color - text color.
 * @prop {string} bg - button background-color.
 * @prop {string} hover - button hover background color override.
 * @prop {number} kind- [primary,secondary,success,danger].
 * @prop {string} variant- outline, defaults to normal.
 * @prop {string} fullWidth- take max space in width.
 */
export default function Button(props) {
  let padding, font, background, color, hover;
  switch (props.kind) {
    case "primary":
      background = "var(--primary)";
      hover = "var(--primary-hovered)";
      color = "#fff";
      break;
    case "secondary":
      background = "#111";
      hover = "var(--neutral-500)";
      color = "#fff";
      break;
    case "success":
      background = "var(--success)";
      hover = "var(--success-hovered)";
      color = "#fff";
      break;
    case "danger":
      background = "var(--danger)";
      hover = "var(--danger-hovered)";
      color = "#fff";
      break;
    default:
      background = "var(--primary)";
      hover = "var(--primary-hovered)";
      color = "#fff";
      break;
  }
  switch (props.size) {
    case "sm":
      padding = "var(--space-xxxs) var(--space-xxs)";
      font = "var(--btn-sm)";
      break;
    case "md":
      padding = "var(--space-xxs) var(--space-sm)";
      font = "var(--btn-md)";
      break;
    case "lg":
      padding = "var(--space-sm) var(--space-md)";
      font = "var(--btn-lg)";
      break;
    default:
      padding = "var(--space-xxxs) var(--space-xxs)";
      font = "var(--btn-sm)";
      break;
  }

  const SButton = styled.button`
    font-size: ${font};
    display: ${props.display || "flex"};
    align-items: center;
    ${props.fullWidth
      ? "display: flex;" +
        "margin-right: 0px !important;" +
        "width: 100%;" +
        "justify-content: center;"
      : null}
    padding: ${padding};
    font-weight: 500;
    text-align: center;
    border-radius: 4px;
    border: 2px solid ${props.bg || background};
    color: ${(props) =>
      props.variant === "normal" || props.variant === undefined
        ? props.color || color
        : props.color || "var(--text-dark)"};
    background: ${(props) =>
      props.variant === "normal" || props.variant === undefined
        ? props.bg || background || "var(--primary)"
        : "transparent"};
    transition-timing-function: ease;
    transition-duration: 0.3s;

    &:hover {
      background: ${(props) =>
        props.variant === "normal" || props.variant === undefined
          ? props.hover || props.bg || hover || "var(--primary)"
          : "transparent"};
      box-shadow: 0px 3px 3px rgba(46, 41, 51, 0.08),
        0px 2px 4px rgba(71, 63, 79, 0.08);
      border: 2px solid ${props.hover || props.bg || hover};
    }

    &:disabled {
      color: var(--text-light);
      cursor: not-allowed;
      box-shadow: none;
      opacity: 0.5;
      filter: grayscale(100%);
    }

    &:active {
      transform: translateY(1px);
    }
  `;
  return <SButton {...props}></SButton>;
}
