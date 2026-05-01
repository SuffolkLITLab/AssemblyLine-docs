export function Button({
  href,
  className = "button button--primary",
  children,
  style = {},
  ...otherProps
}) {
  /**
   * A reusable button component for styling links as buttons.
   *
   * @param {string} href - The URL to navigate to
   * @param {string} [className] - CSS classes (defaults to "button button--primary")
   * @param {React} children - Button text or content
   * @param {object} [style] - Inline styles (can override default fontWeight and textDecoration)
   * @param {object} [otherProps] - Additional HTML attributes
   *
   * @returns {React} - An anchor element styled as a button
   */
  return (
		<a
			href={href}
			className={className}
			style={{ fontWeight: "normal", textDecoration: "none", ...style }}
			{...otherProps}
		>
			{children}
		</a>
  );
}
