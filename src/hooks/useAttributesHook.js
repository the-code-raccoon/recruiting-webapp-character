import { useState } from "react";

export const useAttributesHook = () => {
    const [strength, setStrength] = useState(10);
    const [dexterity, setDexterity] = useState(10);
    const [constitution, setConstitution] = useState(10);
    const [intelligence, setIntelligence] = useState(10);
    const [wisdom, setWisdom] = useState(10);
    const [charisma, setCharisma] = useState(10);

    const modifier = (state) => Math.floor((state - 10) / 2);

    return {
        Strength: {
            state: strength,
            plus: () => setStrength(() => strength + 1),
            minus: () => setStrength(() => strength - 1),
            modifier: modifier(strength),
        },
        Dexterity: {
            state: dexterity,
            plus: () => setDexterity(() => dexterity + 1),
            minus: () => setDexterity(() => dexterity - 1),
            modifier: modifier(dexterity),
        },
        Constitution: {
            state: constitution,
            plus: () => setConstitution(() => constitution + 1),
            minus: () => setConstitution(() => constitution - 1),
            modifier: modifier(constitution),
        },
        Intelligence: {
            state: intelligence,
            plus: () => setIntelligence(() => intelligence + 1),
            minus: () => setIntelligence(() => intelligence - 1),
            modifier: modifier(intelligence),
        },
        Wisdom: {
            state: wisdom,
            plus: () => setWisdom(() => wisdom + 1),
            minus: () => setWisdom(() => wisdom - 1),
            modifier: modifier(wisdom),
        },
        Charisma: {
            state: charisma,
            plus: () => setCharisma(() => charisma + 1),
            minus: () => setCharisma(() => charisma - 1),
            modifier: modifier(charisma),
        },
    };
};
