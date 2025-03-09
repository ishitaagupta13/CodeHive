import React, { useState, useEffect } from "react";
import { db, collection, getDocs } from "./firebase";
import "./index.css";

const HackathonSearch = () => {
    const [userSkills, setUserSkills] = useState([]);
    const [hackathons, setHackathons] = useState([]);
    const [inputSkill, setInputSkill] = useState("");

    useEffect(() => {
        fetchHackathons();
    }, []);

    const fetchHackathons = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "hackathons"));
            const hackathonList = querySnapshot.docs.map(doc => doc.data());
            setHackathons(hackathonList);
        } catch (error) {
            console.error("Error fetching hackathons:", error);
        }
    };

    const addSkill = () => {
        if (inputSkill.trim() && !userSkills.includes(inputSkill.toLowerCase())) {
            setUserSkills([...userSkills, inputSkill.toLowerCase()]);
            setInputSkill("");
        }
    };

    const removeSkill = (skill) => {
        setUserSkills(userSkills.filter(s => s !== skill));
    };

    const filterHackathons = () => {
        return hackathons.filter(hackathon =>
            hackathon.skills.some(skill => userSkills.includes(skill.toLowerCase()))
        );
    };

    return (
        <div className="container">
            <h2>Enter Your Skills</h2>
            <div className="skills-input">
                <input
                    type="text"
                    placeholder="Enter a skill..."
                    value={inputSkill}
                    onChange={(e) => setInputSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                />
                <button onClick={addSkill}>Add</button>
            </div>
            <div className="skills-tags">
                {userSkills.map(skill => (
                    <span key={skill} className="skill-tag">
                        {skill} <span onClick={() => removeSkill(skill)}>×</span>
                    </span>
                ))}
            </div>

            <button onClick={fetchHackathons}>Find Hackathons</button>

            <h2>Recommended Hackathons</h2>
            <div className="hackathon-cards">
                {filterHackathons().length > 0 ? (
                    filterHackathons().map((hackathon, index) => (
                        <div key={index} className="hackathon-card">
                            <h3>{hackathon.title}</h3>
                            <p>{hackathon.description}</p>
                            <p><strong>Date:</strong> {hackathon.date}</p>
                            <p><strong>Location:</strong> {hackathon.location}</p>
                            <a href={hackathon.url} target="_blank" rel="noopener noreferrer">Apply Now</a>
                        </div>
                    ))
                ) : (
                    <p>No matching hackathons found.</p>
                )}
            </div>
        </div>
    );
};

export default HackathonSearch;
