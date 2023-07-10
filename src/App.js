import { useState } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts.js";
import { useAttributesHook } from "./hooks/useAttributesHook";

function App() {
    const {
        myAttributes,
        possibleClasses,
        availableSkillPoints,
        skillPoints,
        plusSkillPoints,
        minusSkillPoints,
    } = useAttributesHook();
    const [selectedClass, setSelectedClass] = useState();

    return (
        <div className="App">
            <header className="App-header">
                <h1>React Coding Exercise - Francesca Ho</h1>
            </header>
            <section className="App-section">
                <div className="container">
                    <h1>Attributes</h1>
                    {ATTRIBUTE_LIST.map((attribute) => (
                        <div key={attribute}>
                            {attribute}: {myAttributes[attribute].state}{" "}
                            (Modifier: {myAttributes[attribute].modifier})
                            <button onClick={myAttributes[attribute].plus}>
                                +
                            </button>
                            <button onClick={myAttributes[attribute].minus}>
                                -
                            </button>
                        </div>
                    ))}
                </div>
                <div className="container">
                    <h1>Classes</h1>
                    {Object.keys(CLASS_LIST).map((characterClass) => (
                        <div
                            key={characterClass}
                            onClick={() => {
                                setSelectedClass(characterClass);
                            }}
                            className={
                                possibleClasses[characterClass] ? "red" : ""
                            }
                        >
                            {characterClass}
                        </div>
                    ))}
                </div>
                {selectedClass && (
                    <div className="container">
                        <h1>{selectedClass} Minimum Requirements</h1>
                        {ATTRIBUTE_LIST.map((attribute) => (
                            <div key={attribute}>
                                {attribute}:{" "}
                                {CLASS_LIST[selectedClass][attribute]}
                            </div>
                        ))}
                    </div>
                )}
                <div className="container">
                    <h1>Skills</h1>
                    <h4>
                        Total skill points available: {availableSkillPoints}
                    </h4>
                    {SKILL_LIST.map(({ name, attributeModifier }) => {
                        if (!skillPoints[name]) {
                            return <></>;
                        }
                        return (
                            <div key={name}>
                                {name}: {skillPoints[name].value} (Modifier:{" "}
                                {attributeModifier})
                                <button onClick={() => plusSkillPoints(name)}>
                                    +
                                </button>
                                <button onClick={() => minusSkillPoints(name)}>
                                    -
                                </button>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}

export default App;
