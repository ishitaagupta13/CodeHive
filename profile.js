document.addEventListener('DOMContentLoaded', function() {
    // Edit profile button functionality
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const profileView = document.getElementById('profile-view');
    const profileEdit = document.getElementById('profile-edit');
    
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            profileView.style.display = 'none';
            profileEdit.style.display = 'block';
        });
    }
    
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', function(e) {
            e.preventDefault();
            profileEdit.style.display = 'none';
            profileView.style.display = 'block';
        });
    }
    
    // Profile edit form submission
    const profileEditForm = document.getElementById('profile-edit-form');
    if (profileEditForm) {
        profileEditForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For this example, we'll just simulate success and return to view mode
            
            // Update profile view with new values
            updateProfileFromForm();
            
            // Switch back to view mode
            profileEdit.style.display = 'none';
            profileView.style.display = 'block';
            
            // Show success message
            showMessage('Profile updated successfully!', 'success');
        });
    }
    
    // Profile setup form functionality
    const profileSetupForm = document.getElementById('profile-setup-form');
    const setupSteps = document.querySelectorAll('.setup-step');
    const stepIndicators = document.querySelectorAll('.step');
    
    // Next step buttons
    const nextButtons = document.querySelectorAll('.next-step');
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextStepNum = this.getAttribute('data-next');
            goToStep(nextStepNum);
        });
    });
    
    // Previous step buttons
    const prevButtons = document.querySelectorAll('.prev-step');
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevStepNum = this.getAttribute('data-prev');
            goToStep(prevStepNum);
        });
    });
    
    // Step indicators
    stepIndicators.forEach(step => {
        step.addEventListener('click', function() {
            const stepNum = this.getAttribute('data-step');
            goToStep(stepNum);
        });
    });
    
    // Handle profile setup form submission
    if (profileSetupForm) {
        profileSetupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For this example, we'll just simulate success and redirect to profile view
            
            // Hide setup form
            document.getElementById('profile-setup').style.display = 'none';
            
            // Populate and show profile view
            populateProfileFromSetup();
            profileView.style.display = 'block';
            
            // Show success message
            showMessage('Profile created successfully!', 'success');
            
            // Set profile as created in local storage
            localStorage.setItem('profileCreated', 'true');
        });
    }
    
    // Function to update profile view from edit form
    function updateProfileFromForm() {
        // Get form values
        const fullName = document.getElementById('fullName').value;
        const jobTitle = document.getElementById('jobTitle').value;
        const email = document.getElementById('email').value;
        const location = document.getElementById('location').value;
        const team = document.getElementById('team').value;
        const skills = document.getElementById('skills').value;
        const experience = document.getElementById('experience').value;
        const competitions = document.getElementById('competitions').value;
        const bio = document.getElementById('bio').value;
        
        // Update profile view
        document.querySelector('.profile-info h2').textContent = fullName;
        document.querySelector('.profile-info p').textContent = jobTitle;
        document.querySelector('.profile-avatar').textContent = getInitials(fullName);
        
        // Update personal information
        const profileDetails = document.querySelectorAll('.profile-detail');
        profileDetails.forEach(detail => {
            const label = detail.querySelector('label');
            if (label) {
                if (label.textContent === 'Email') {
                    detail.querySelector('p').textContent = email;
                } else if (label.textContent === 'Location') {
                    detail.querySelector('p').textContent = location;
                } else if (label.textContent === 'Team') {
                    detail.querySelector('p').textContent = team;
                } else if (label.textContent === 'Experience Level') {
                    detail.querySelector('p').textContent = experience;
                } else if (label.textContent === 'Previous Competitions') {
                    detail.querySelector('p').textContent = competitions;
                }
            } else {
                // This is probably the bio section
                const bioSection = document.querySelector('.profile-section:nth-child(4) .profile-detail p');
                if (bioSection) {
                    bioSection.textContent = bio;
                }
            }
        });
        
        // Update skills
        const skillsList = document.querySelector('.skills-list');
        skillsList.innerHTML = '';
        const skillsArray = skills.split(',');
        skillsArray.forEach(skill => {
            const skillTag = document.createElement('span');
            skillTag.className = 'skill-tag';
            skillTag.textContent = skill.trim();
            skillsList.appendChild(skillTag);
        });
    }
    
    // Function to populate profile from setup form
    function populateProfileFromSetup() {
        // Get form values
        const fullName = document.getElementById('setup-fullName').value;
        const jobTitle = document.getElementById('setup-jobTitle').value;
        const email = document.getElementById('setup-email').value;
        const location = document.getElementById('setup-location').value;
        const team = document.getElementById('setup-team').value;
        const skills = document.getElementById('setup-skills').value;
        const experience = document.getElementById('setup-experience').value;
        const competitions = document.getElementById('setup-competitions').value;
        const bio = document.getElementById('setup-bio').value;
        
        // Update profile view
        document.querySelector('.profile-info h2').textContent = fullName;
        document.querySelector('.profile-info p').textContent = jobTitle || 'Participant';
        document.querySelector('.profile-avatar').textContent = getInitials(fullName);
        
        // Update personal information
        const profileDetails = document.querySelectorAll('.profile-detail');
        profileDetails.forEach(detail => {
            const label = detail.querySelector('label');
            if (label) {
                if (label.textContent === 'Email') {
                    detail.querySelector('p').textContent = email;
                } else if (label.textContent === 'Location') {
                    detail.querySelector('p').textContent = location || 'Not specified';
                } else if (label.textContent === 'Team') {
                    detail.querySelector('p').textContent = team || 'Not specified';
                } else if (label.textContent === 'Experience Level') {
                    detail.querySelector('p').textContent = experience || 'Not specified';
                } else if (label.textContent === 'Previous Competitions') {
                    detail.querySelector('p').textContent = competitions || 'None';
                }
            } else {
                // This is probably the bio section
                const bioSection = document.querySelector('.profile-section:nth-child(4) .profile-detail p');
                if (bioSection) {
                    bioSection.textContent = bio || 'No bio provided';
                }
            }
        });
        
        // Update skills
        const skillsList = document.querySelector('.skills-list');
        skillsList.innerHTML = '';
        if (skills) {
            const skillsArray = skills.split(',');
            skillsArray.forEach(skill => {
                const skillTag = document.createElement('span');
                skillTag.className = 'skill-tag';
                skillTag.textContent = skill.trim();
                skillsList.appendChild(skillTag);
            });
        } else {
            const skillTag = document.createElement('span');
            skillTag.className = 'skill-tag';
            skillTag.textContent = 'No skills specified';
            skillsList.appendChild(skillTag);
        }
    }
    
    // Function to navigate to a specific setup step
    function goToStep(stepNum) {
        // Hide all steps
        setupSteps.forEach(step => {
            step.classList.remove('active');
        });
        
        // Update step indicators
        stepIndicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Show the selected step
        document.getElementById(`step-${stepNum}`).classList.add('active');
        
        // Highlight the current step indicator
        document.querySelector(`.step[data-step="${stepNum}"]`).classList.add('active');
    }
    
    // Function to get initials from name
    function getInitials(name) {
        if (!name) return '';
        const names = name.split(' ');
        if (names.length === 1) return names[0].charAt(0);
        return names[0].charAt(0) + names[names.length - 1].charAt(0);
    }
    
    // Function to show message
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            messageDiv.classList.remove('show');
            setTimeout(() => {
                messageDiv.remove();
            }, 300);
        }, 3000);
    }
    
    // Check if profile is created
    checkProfileStatus();
});

// Function to check if profile exists or needs to be created
function checkProfileStatus() {
    // In a real application, this would be an API call to check if the user has a profile
    // For this example, we'll use localStorage to simulate
    const profileCreated = localStorage.getItem('profileCreated');
    
    if (!profileCreated) {
        // Profile doesn't exist, show setup form
        document.getElementById('profile-view').style.display = 'none';
        document.getElementById('profile-setup').style.display = 'block';
    }
}




// Import Firebase modules
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { saveProfileData, loadProfileData } from "./firebase-init.js";

// Initialize Firebase auth and firestore
const auth = getAuth();
const db = getFirestore();

document.addEventListener('DOMContentLoaded', function() {
    // --- Edit profile button functionality ---
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const profileView = document.getElementById('profile-view');
    const profileEdit = document.getElementById('profile-edit');
    
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            profileView.style.display = 'none';
            profileEdit.style.display = 'block';
        });
    }
    
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', function(e) {
            e.preventDefault();
            profileEdit.style.display = 'none';
            profileView.style.display = 'block';
        });
    }
    
    // --- Profile setup navigation ---
    const setupSteps = document.querySelectorAll('.setup-step');
    const stepIndicators = document.querySelectorAll('.step');
    
    // Next step buttons
    const nextButtons = document.querySelectorAll('.next-step');
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextStepNum = this.getAttribute('data-next');
            goToStep(nextStepNum);
        });
    });
    
    // Previous step buttons
    const prevButtons = document.querySelectorAll('.prev-step');
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevStepNum = this.getAttribute('data-prev');
            goToStep(prevStepNum);
        });
    });
    
    // Step indicators
    stepIndicators.forEach(step => {
        step.addEventListener('click', function() {
            const stepNum = this.getAttribute('data-step');
            goToStep(stepNum);
        });
    });
    
    // Check auth state and load appropriate profile
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            try {
                // Get user document to determine role
                const userDoc = await getDoc(doc(db, "users", user.uid));
                
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const role = userData.role || 'participant'; // Default to participant
                    
                    // Load profile data
                    const profileResult = await loadProfileData(user.uid, role);
                    
                    if (profileResult.success) {
                        // Profile exists, display it
                        populateProfile(profileResult.data);
                    } else if (profileResult.reason === 'profile-not-found') {
                        // Profile doesn't exist, show setup form with role-specific fields
                        setupProfileForm(role);
                    }
                }
            } catch (error) {
                console.error("Error loading user data:", error);
                showMessage("Error loading profile data. Please try again.", "error");
            }
        } else {
            // Redirect to login if not authenticated
            window.location.href = 'login.html';
        }
    });
});

/**
 * Set up profile form with role-specific fields
 * @param {string} role - User role
 */
function setupProfileForm(role) {
    const profileSetup = document.getElementById('profile-setup');
    profileSetup.style.display = 'block';
    document.getElementById('profile-view').style.display = 'none';
    
    // Show role-specific fields
    if (role === 'judge') {
        // Update form title
        const setupTitle = profileSetup.querySelector('h2');
        if (setupTitle) setupTitle.textContent = 'Complete Your Judge Profile';
        
        // Replace team field with organization field
        const teamField = document.getElementById('setup-team')?.closest('.form-group');
        if (teamField) {
            teamField.innerHTML = `
                <label for="setup-organization">Organization</label>
                <input type="text" id="setup-organization" name="organization">
            `;
        }
        
        // Replace skills field with expertise field
        const skillsField = document.getElementById('setup-skills')?.closest('.form-group');
        if (skillsField) {
            skillsField.innerHTML = `
                <label for="setup-expertise">Areas of Expertise</label>
                <input type="text" id="setup-expertise" name="expertise" placeholder="e.g., UI/UX, Data Science, Cloud Architecture">
            `;
        }
        
        // Replace competitions field with previous judging field
        const competitionsField = document.getElementById('setup-competitions')?.closest('.form-group');
        if (competitionsField) {
            competitionsField.innerHTML = `
                <label for="setup-previous-judging">Previous Judging Experience</label>
                <input type="text" id="setup-previous-judging" name="previous-judging" placeholder="Previous hackathons or competitions you've judged">
            `;
        }
    }
    
    // Set up form submission
    const profileSetupForm = document.getElementById('profile-setup-form');
    if (profileSetupForm) {
        // Remove any existing listener
        const newForm = profileSetupForm.cloneNode(true);
        profileSetupForm.parentNode.replaceChild(newForm, profileSetupForm);
        
        // Add new listener
        newForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleProfileSetup(e, role);
        });
    }
}

/**
 * Populate profile view from loaded data
 * @param {object} profileData - Profile data from Firestore
 */
function populateProfile(profileData) {
    if (!profileData) return;
    
    // Update header info
    const nameElement = document.querySelector('.profile-info h2');
    if (nameElement) nameElement.textContent = profileData.fullName || 'Name Not Set';
    
    const jobTitleElement = document.querySelector('.profile-info p');
    if (jobTitleElement) jobTitleElement.textContent = profileData.jobTitle || '';
    
    const avatarElement = document.querySelector('.profile-avatar');
    if (avatarElement) avatarElement.textContent = getInitials(profileData.fullName || '');
    
    // Update profile details sections
    updateProfileDetailByLabel('Email', profileData.email || '');
    updateProfileDetailByLabel('Location', profileData.location || 'Not specified');
    updateProfileDetailByLabel('Team', profileData.team || 'Not specified');
    updateProfileDetailByLabel('Experience Level', profileData.experience || 'Not specified');
    
    // Update role-specific fields
    if (profileData.previousCompetitions) {
        updateProfileDetailByLabel('Previous Competitions', profileData.previousCompetitions);
    } else if (profileData.previousJudging) {
        updateProfileDetailByLabel('Previous Judging', profileData.previousJudging);
    }
    
    if (profileData.expertise) {
        updateProfileDetailByLabel('Expertise', profileData.expertise);
    }
    
    // Update bio
    const bioSection = document.querySelector('.profile-section h3');
    if (bioSection && bioSection.textContent === 'Bio') {
        const bioContent = bioSection.parentElement.querySelector('.profile-detail p');
        if (bioContent) bioContent.textContent = profileData.bio || 'No bio provided';
    }
    
    // Update skills list
    if (profileData.skills) {
        const skillsList = document.querySelector('.skills-list');
        if (skillsList) {
            skillsList.innerHTML = '';
            const skillsArray = profileData.skills.split(',');
            skillsArray.forEach(skill => {
                const skillTag = document.createElement('span');
                skillTag.className = 'skill-tag';
                skillTag.textContent = skill.trim();
                skillsList.appendChild(skillTag);
            });
        }
    }
}

/**
 * Update specific profile field by label text
 * @param {string} labelText - The label text to search for
 * @param {string} value - The new value for this field
 */
function updateProfileDetailByLabel(labelText, value) {
    const profileDetails = document.querySelectorAll('.profile-detail');
    profileDetails.forEach(detail => {
        const label = detail.querySelector('label');
        if (label && label.textContent === labelText) {
            detail.querySelector('p').textContent = value;
        }
    });
}

/**
 * Navigate to a specific profile setup step
 * @param {string} stepNum - Step number
 */
function goToStep(stepNum) {
    // Hide all steps
    document.querySelectorAll('.setup-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Update step indicators
    document.querySelectorAll('.step').forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Show the selected step
    document.getElementById(`step-${stepNum}`).classList.add('active');
    
    // Highlight the current step indicator
    document.querySelector(`.step[data-step="${stepNum}"]`).classList.add('active');
}

/**
 * Get initials from a name
 * @param {string} name - Full name
 * @returns {string} - Initials
 */
function getInitials(name) {
    if (!name) return '';
    const names = name.split(' ');
    if (names.length === 1) return names[0].charAt(0);
    return names[0].charAt(0) + names[names.length - 1].charAt(0);
}

/**
 * Display a temporary message
 * @param {string} message - Message text
 * @param {string} type - Message type (success, error, etc.)
 */
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        messageDiv.classList.remove('show');
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 3000);
}

//save changes
