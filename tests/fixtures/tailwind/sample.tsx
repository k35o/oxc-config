// Deliberate Tailwind violations for the behavioral lint test: a duplicate
// class, and two classes that set the same property.
export const Card = () => <div className="flex p-2 p-2">hi</div>;
export const Panel = () => <div className="block flex">hi</div>;
