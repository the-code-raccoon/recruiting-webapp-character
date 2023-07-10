import { ATTRIBUTE_LIST } from "../consts";

const Attributes = ({myAttributes}) => {
    return (
        <div className="container">
            <h1>Attributes</h1>
            {ATTRIBUTE_LIST.map((attribute) => (
                <div key={attribute}>
                    {attribute}: {myAttributes[attribute].state} (Modifier:{" "}
                    {myAttributes[attribute].modifier})
                    <button onClick={myAttributes[attribute].plus}>+</button>
                    <button onClick={myAttributes[attribute].minus}>-</button>
                </div>
            ))}
        </div>
    );
};

export default Attributes;
