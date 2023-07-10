import { useState, useEffect } from "react";
import { CLASS_LIST, SKILL_LIST } from "../consts";

export const useAttributesHook = () => {
    // =========== START OF ATTRIBUTES ===========
    const [strength, setStrength] = useState(10);
    const [dexterity, setDexterity] = useState(10);
    const [constitution, setConstitution] = useState(10);
    const [intelligence, setIntelligence] = useState(10);
    const [wisdom, setWisdom] = useState(10);
    const [charisma, setCharisma] = useState(10);

    const plus = (state, setState) => {
        setState(state + 1);
    };

    const minus = (state, setState) => {
        if (state > 0) {
            setState(state - 1);
        }
    };

    const modifier = (state) => Math.floor((state - 10) / 2);
    // =========== END OF ATTRIBUTES ===========

    // =========== START OF SKILL POINTS ===========
    const [availableSkillPoints, setAvailableSkillPoints] = useState(10);
    const [skillPoints, setSkillPoints] = useState({});

    useEffect(() => {
        const temp = {};
        for (const skill of SKILL_LIST) {
            temp[skill.name] = {
                value: 0,
                atttributeModifier: skill.attributeModifier,
                modifierValue: 0,
            };
        }
        setSkillPoints(temp);
    }, []);

    const plusSkillPoints = (skillName) => {
        if (availableSkillPoints === 0) {
            return;
        } else {
            setAvailableSkillPoints(availableSkillPoints - 1);
        }
        const value = skillPoints[skillName].value;

        setSkillPoints((prev) => {
            return {
                ...prev,
                [skillName]: { ...prev[skillName], value: value + 1 },
            };
        });
    };

    const minusSkillPoints = (skillName) => {
        const value = skillPoints[skillName].value;
        if (value === 0) {
            return;
        } else {
            setAvailableSkillPoints(availableSkillPoints + 1);
        }

        setSkillPoints((prev) => {
            return {
                ...prev,
                [skillName]: { ...prev[skillName], value: value - 1 },
            };
        });
    };

    useEffect(() => {
        // I'm pretty sure this logic is wrong but I ran out of time to fix it :'(
        setAvailableSkillPoints((prev) => prev + modifier(intelligence) * 4);
    }, [intelligence]);
    // =========== END OF SKILL POINTS ===========

    // =========== START OF CLASSES ===========
    const [possibleClasses, setPossibleClasses] = useState({
        Barbarian: false,
        Wizard: false,
        Bard: false,
    });

    useEffect(() => {
        for (const characterClass in CLASS_LIST) {
            if (Object.hasOwnProperty.call(CLASS_LIST, characterClass)) {
                const classAttributes = CLASS_LIST[characterClass];

                const checkMinRequirements = (characterClass) => {
                    if (strength < characterClass["Strength"]) {
                        return false;
                    }
                    if (dexterity < characterClass["Dexterity"]) {
                        return false;
                    }
                    if (constitution < characterClass["Constitution"]) {
                        return false;
                    }
                    if (intelligence < characterClass["Intelligence"]) {
                        return false;
                    }
                    if (wisdom < characterClass["Wisdom"]) {
                        return false;
                    }
                    if (charisma < characterClass["Charisma"]) {
                        return false;
                    }
                    return true;
                };

                if (checkMinRequirements(classAttributes)) {
                    setPossibleClasses((prev) => {
                        return { ...prev, [characterClass]: true };
                    });
                } else {
                    setPossibleClasses((prev) => {
                        return { ...prev, [characterClass]: false };
                    });
                }
            }
        }
    }, [
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
        setPossibleClasses,
    ]);
    // =========== END OF CLASSES ===========

    return {
        myAttributes: {
            Strength: {
                state: strength,
                plus: () => plus(strength, setStrength),
                minus: () => minus(strength, setStrength),
                modifier: modifier(strength),
            },
            Dexterity: {
                state: dexterity,
                plus: () => plus(dexterity, setDexterity),
                minus: () => minus(dexterity, setDexterity),
                modifier: modifier(dexterity),
            },
            Constitution: {
                state: constitution,
                plus: () => plus(constitution, setConstitution),
                minus: () => minus(constitution, setConstitution),
                modifier: modifier(constitution),
            },
            Intelligence: {
                state: intelligence,
                plus: () => plus(intelligence, setIntelligence),
                minus: () => minus(intelligence, setIntelligence),
                modifier: modifier(intelligence),
            },
            Wisdom: {
                state: wisdom,
                plus: () => plus(wisdom, setWisdom),
                minus: () => minus(wisdom, setWisdom),
                modifier: modifier(wisdom),
            },
            Charisma: {
                state: charisma,
                plus: () => plus(charisma, setCharisma),
                minus: () => minus(charisma, setCharisma),
                modifier: modifier(charisma),
            },
        },
        possibleClasses,
        availableSkillPoints,
        skillPoints,
        plusSkillPoints,
        minusSkillPoints,
    };
};
