import { useState } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts.js";
import { useAttributesHook } from "./hooks/useAttributesHook";

function App() {
    const [attributesHooks, possibleClasses] = useAttributesHook();
    const [selectedClass, setSelectedClass] = useState();
    const [skillPoints, setSkillPoints] = useState(10);

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
                            {attribute}: {attributesHooks[attribute].state}{" "}
                            (Modifier: {attributesHooks[attribute].modifier})
                            <button onClick={attributesHooks[attribute].plus}>
                                +
                            </button>
                            <button onClick={attributesHooks[attribute].minus}>
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
                    <h4>Total skill points available: {skillPoints}</h4>
                    {SKILL_LIST.map(({ name, attributeModifier }) => (
                        <div key={name}>
                            {name}: 0 (Modifier: {attributeModifier})
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default App;
