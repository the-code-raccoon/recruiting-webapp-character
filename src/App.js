import "./App.css";
import { useAttributesHook } from "./hooks/useHooks";
import Skills from "./components/Skills";
import Attributes from "./components/Attributes";
import Classes from "./components/Classes";

function App() {
    const {
        availableSkillPoints,
        skillPoints,
        plusSkillPoints,
        minusSkillPoints,
        myAttributes,
        possibleClasses,
    } = useAttributesHook();

    return (
        <div className="App">
            <header className="App-header">
                <h1>React Coding Exercise - Francesca Ho</h1>
            </header>
            <section className="App-section">
                {Attributes({myAttributes})}
                {Classes({possibleClasses})}
                {Skills({
                    availableSkillPoints,
                    skillPoints,
                    plusSkillPoints,
                    minusSkillPoints,
                })}
            </section>
        </div>
    );
}

export default App;
