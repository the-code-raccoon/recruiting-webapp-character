import { SKILL_LIST } from "../consts";

const Skills = ({
    availableSkillPoints,
    skillPoints,
    plusSkillPoints,
    minusSkillPoints,
}) => {
    return (
        <div className="container">
            <h1>Skills</h1>
            <h4>Total skill points available: {availableSkillPoints}</h4>
            {SKILL_LIST.map(({ name, attributeModifier }) => {
                if (!skillPoints[name]) {
                    return <></>;
                }
                return (
                    <div key={name}>
                        {name}: {skillPoints[name].value} (Modifier:{" "}
                        {attributeModifier})
                        <button onClick={() => plusSkillPoints(name)}>+</button>
                        <button onClick={() => minusSkillPoints(name)}>
                            -
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default Skills;
