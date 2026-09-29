// Deliberate `<img>` in an ordinary component for the behavioral lint test.
export function Avatar() {
  return <img src="https://example.com/avatar.png" alt="Avatar" />;
}
