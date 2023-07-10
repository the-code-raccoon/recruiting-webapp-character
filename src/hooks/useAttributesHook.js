import { useState, useEffect } from "react";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "../consts";

export const useAttributesHook = () => {
    // const [attributesState, setAttributesState] = useState({
    //     Strength: 10,
    //     Dexterity: 10,
    //     Constitution: 10,
    //     Intelligence: 10,
    //     Wisdom: 10,
    //     Charisma: 10,
    // });

    // const plus2 = (attribute) => {
    //     setAttributesState((prev) => {
    //         console.log("prev", prev, prev[attribute]);
    //         const newthingy = { ...prev, attribute: prev[attribute] + 1 };
    //         console.log("new", newthingy);
    //         return newthingy;
    //     });
    // };

    // const minus2 = (attribute) => {
    //     setAttributesState((prev) => {
    //         const value = prev[attribute];
    //         return { ...prev, attribute: value > 0 ? value - 1 : value };
    //     });
    // };

    const [strength, setStrength] = useState(10);
    const [dexterity, setDexterity] = useState(10);
    const [constitution, setConstitution] = useState(10);
    const [intelligence, setIntelligence] = useState(10);
    const [wisdom, setWisdom] = useState(10);
    const [charisma, setCharisma] = useState(10);

    const [possibleClasses, setPossibleClasses] = useState({
        Barbarian: false,
        Wizard: false,
        Bard: false,
    });

    // const myAttributes = {
    //     Strength: strength,
    //     Dexterity: dexterity,
    //     Constitution: constitution,
    //     Intelligence: intelligence,
    //     Wisdom: wisdom,
    //     Charisma: charisma,
    // };

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
        setAvailableSkillPoints(availableSkillPoints + modifier(intelligence) * 4);
    }, [intelligence]);

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

    const plus = (state, setState) => {
        setState(state + 1);
    };

    const minus = (state, setState) => {
        if (state > 0) {
            setState(state - 1);
        }
    };

    const modifier = (state) => Math.floor((state - 10) / 2);

    // const hooks = {};
    // for (const attribute of ATTRIBUTE_LIST) {
    //     hooks[attribute] = {
    //         state: attributesState[attribute],
    //         plus: () => plus2(attribute),
    //         minus: () => minus2(attribute),
    //         modifier: modifier(attributesState[attribute]),
    //     };
    // }

    // console.log(hooks);
    // return hooks;

    // const createHook = ATTRIBUTE_LIST.map((attributeState, setAttributeState) => {
    //     return {
    //         state: attributeState,
    //         plus: () => plus(attributeState, setAttributeState),
    //         minus: () => minus(attributeState, setAttributeState),
    //         modifier: modifier(attributeState),
    //     };
    // });

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
