// Deliberate HTML-nesting violation (<div> inside <p>) for the behavioral
// lint test.
export const Broken = () => (
  <p>
    <div>never valid</div>
  </p>
);
