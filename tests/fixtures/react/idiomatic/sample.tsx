// Idiomatic React the `react` preset must accept without a single diagnostic.

export function Menu({ options }: { options: string[] }) {
  return (
    <section>
      <p>Don't see what you need?</p>
      <button type="button" commandfor="menu-dialog" command="show-modal">
        Open
      </button>
      <a href="https://example.com" target="_blank" rel="noopener">
        Docs
      </a>
      <ul role="listbox" aria-label="Options">
        {options.map((option) => (
          <li key={option} role="option" aria-selected={false}>
            {option}
          </li>
        ))}
      </ul>
      <table>
        <tbody>
          <tr>
            <td />
            <td>Total</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
