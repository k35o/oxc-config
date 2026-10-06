// Deliberate Tailwind violations for the behavioral lint test: a duplicate
// class, two classes that set the same property, and a class built at runtime.
export const Card = () => <div className="flex p-2 p-2">hi</div>;
export const Panel = () => <div className="block flex">hi</div>;
export const Badge = ({ tone }: { tone: string }) => <div className={`text-${tone}`}>hi</div>;
