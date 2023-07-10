import { useState } from "react";
import { ATTRIBUTE_LIST, CLASS_LIST } from "../consts";

const Classes = ({
    possibleClasses,
}) => {
    const [selectedClass, setSelectedClass] = useState();

    return (
        <>
            <div className="container">
                <h1>Classes</h1>
                {Object.keys(CLASS_LIST).map((characterClass) => (
                    <div
                        key={characterClass}
                        onClick={() => {
                            setSelectedClass(characterClass);
                        }}
                        // If attributes meet minimum requirements, then apply red class
                        className={possibleClasses[characterClass] ? "red" : ""}
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
                            {attribute}: {CLASS_LIST[selectedClass][attribute]}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Classes;
